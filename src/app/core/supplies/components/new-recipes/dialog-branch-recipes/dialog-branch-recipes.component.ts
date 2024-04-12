import { Component, Inject, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SuppliesService } from '../../../services/supplies.service';
import { AllStore, MyStoreParams } from '../../../interfaces/supplies';
import { FormGroup, FormControl } from '@angular/forms';
import { LoadingService } from 'src/app/global/services/loading.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';

@Component({
  selector: 'app-dialog-branch-recipes',
  templateUrl: './dialog-branch-recipes.component.html',
  styleUrls: ['./dialog-branch-recipes.component.css']
})
export class DialogBranchRecipesComponent {
  private dialog = inject(MatDialog)
  private services = inject(SuppliesService)
  private loading = inject(LoadingService);
  private snack = inject(SnackbarService)

  mystores: AllStore[] = []
  // mybranch: AllStore[] = []
  sendStore: any[] = []
  deleteStore: any[] = []
  sendProducts: any[] = []
  mybranch: any[] = []
  params = new FormGroup({
    search: new FormControl(''),
    status: new FormControl('')
  })

  constructor(
    public dialogRef: MatDialogRef<DialogBranchRecipesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }
  ngOnInit(): void {
    this.getAllStore()
    this.getAllBranch()
  }
  closeDialog() {
    this.dialogRef.close()
  }
  getAllStore() {
    const params = new MyStoreParams()
    params.parent = 'false'
    this.services.getUserStores(params).then((result) => {
      // this.loading.hideLoading()
      this.mystores = result
    }).catch((err) => {
      // this.loading.hideLoading()
    });
  }
  getAllBranch() {
    this.loading.showLoading()
    const params = new MyStoreParams()
    params.parent = 'true'
    this.services.getUserStores(params).then((result) => {
      this.loading.hideLoading()
      result.forEach(element => {
        const match = this.data.listStore?.find((item: any) => item.id === element.id);
        const isSelected = match ? true : false;
        this.mybranch.push({
          data: element,
          isSelected: isSelected
        })
        if (isSelected) {
          this.sendStore.push({
            store: element.id
          })
        }
      });
    }).catch((err) => {
      this.snack.openSnackBar("Ocurrió un error, por favor intente de nuevo.");
      this.loading.hideLoading()
    });
  }
  selectBranch(id: number) {
    const index = this.sendStore.findIndex(store => store.store === id);
    if (index !== -1) {
      this.deleteStore.push(this.sendStore[index])
      this.sendStore.splice(index, 1); 
    } else {
      for (let i = 0; this.mybranch.length > i; ++i) {
        if (this.mybranch[i].data.id === id) {
          const data = this.deleteStore.findIndex(item => item.store === this.mybranch[i].data.id)
          if (data !== -1) {
            this.deleteStore.splice(data, 1);
          }
          this.sendStore.push({
            store: this.mybranch[i].data.id
          })
        }
      }
    }

    const selectBranch = this.mybranch.find(item => item.data.id === id)
    if (selectBranch) {
      selectBranch.isSelected = !selectBranch.isSelected
    }
  }
  onSubmit() {
    // this.loading.showLoading()
    let sendProducts:any[]  = [];
    let sendRecipes = [];
    const bodyUpdate: any[] = [];
    let deleteProduct = []
    let deleteRecipe = []
    sendProducts = this.data.products
      .filter((item: any) => item.type === "product")
      .map((item: any) => ({
        [this.data.id != null ? "id" : "product"]: item.product,
        quantity: item.quantity
      }));
    sendRecipes = this.data.products
      .filter((item: any) => item.type !== "product")
      .map((item: any) => ({
        [this.data.id != null ? "id" : "previus_recipe"]: item.product,
        quantity: item.quantity
      }));
    if (this.data.id == null) {
      const body = {
        name: this.data.infoForms.infoForms.nameRecipe,
        price: this.data.infoForms.infoForms.costSale,
        detail: this.data.infoForms.infoForms.description,
        image: this.data.infoForms.image,
        is_base_recipe: this.data.infoForms.infoForms.typeProduct==="1"? true:false,
        store: this.sendStore,
        category: parseInt(this.data.infoForms.infoForms.category),
        prev_recipes: sendRecipes,
        products: sendProducts
      }
      this.services.postRecipes(body).then((result) => {
        this.loading.hideLoading()
        this.dialogRef.close("Receta agregada con éxito");
      }).catch((err) => {
        console.log(err)
        console.log("err")
        this.loading.hideLoading()
      });
    } else {
      const patchBody = {
        name: this.data.infoForms.infoForms.nameRecipe,
        price: this.data.infoForms.infoForms.costSale,
        detail: this.data.infoForms.infoForms.description,
        is_base_recipe: this.data.infoForms.typeProduct==="1"? true:false,
        image: this.data.infoForms.image,
        category: parseInt(this.data.infoForms.infoForms.category),
      }
      const bodyUpdateProducts = {
        method: true,
        products: sendProducts
      }
      const bodyUpdateRecipes = {
        method: true,
        previus_recipe: sendRecipes
      }
      bodyUpdate.push(bodyUpdateRecipes, bodyUpdateProducts)
      deleteProduct = this.data.deleteProduct
        .filter((item: any) => item.type === "product" && !sendProducts.some((s: any) => s.id === item.product))
        .map((item: any) => ({
          id: item.product,
          quantity: item.quantity,
        }))
      deleteRecipe = this.data.deleteProduct
        .filter((item: any) => item.type !== "product"  && !sendProducts.some((s: any) => s.id === item.product) )
        .map((item: any) => ({
          id: item.id,
          quantity: item.quantity,
        }))
      const bodyDeleteProduct = {
        method: false,
        products: deleteProduct
      }
      const bodyDeleteRecipe = {
        method: false,
        previus_recipe: deleteRecipe
      }
      this.deleteStore.forEach((store: any) => {
        const storeData = this.data.listStore.find((item: any) => item.id === store.store);
        if (storeData) {
          bodyUpdate.push({
            method: false,
            stores: {
              id: storeData.id
            }
          });
        }
      });
      this.sendStore.forEach((item: any) => {
        const data = this.data.listStore.find((item: any) => item.id === item.store)
        if (!data) {
          bodyUpdate.push({
            method: true,
            stores: {
              id: item.store
            }
          })
        }
      })
      bodyUpdate.push(bodyDeleteProduct, bodyDeleteRecipe)
      this.services.patchRecipes(patchBody, this.data.id).then((result) => {
        this.services.postUpdateRecipes(bodyUpdate, this.data.id).then((resultUpdate) => {
          this.loading.hideLoading()
          this.dialogRef.close("Receta actualizada con éxito.");
        }).catch((err) => {
          console.log(err)
          this.loading.hideLoading()
        });
      }).catch((err) => {
        this.snack.openSnackBar("Ocurrió un error, por favor intente de nuevo.");
        this.loading.hideLoading()
      });
    }
  }
}
