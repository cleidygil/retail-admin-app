import { Component, Inject, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SuppliesService } from '../../../services/supplies.service';
import { AllStore, MyStoreParams } from '../../../interfaces/supplies';
import { FormGroup, FormControl } from '@angular/forms';
import { LoadingService } from 'src/app/global/services/loading.service';

@Component({
  selector: 'app-dialog-branch-recipes',
  templateUrl: './dialog-branch-recipes.component.html',
  styleUrls: ['./dialog-branch-recipes.component.css']
})
export class DialogBranchRecipesComponent {
  private dialog = inject(MatDialog)
  private services = inject(SuppliesService)
  private loading = inject(LoadingService);
  mystores: AllStore[] = []
  // mybranch: AllStore[] = []
  sendStore: any[] = []
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
    console.log(this.data)
    console.log("this.data")

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
      console.log(this.mystores)
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
        const match = this.data.listStore?.find((item:any) => item.id === element.id);
        const isSelected = match ? true : false;
        const body = {
          data: element,
          isSelected: isSelected
        }
        this.mybranch.push(body)
        if(isSelected){
          const store = {
            store: element.id
          }
          this.sendStore.push(store)
        }
      });
    }).catch((err) => {
      this.loading.hideLoading()
    });
  }
  selectBranch(id: number) {
    console.log(id)
    console.log("id")
    const index = this.sendStore.findIndex(store => store.store === id);
    if (index !== -1) {
      this.sendStore.splice(index, 1); // Elimina el elemento con el ID dado
    }else{
      for (let i = 0; this.mybranch.length > i; ++i) {
        if (this.mybranch[i].data.id === id) {
          const store = {
            store: this.mybranch[i].data.id
          }
          this.sendStore.push(store)
        }
      }
    }
 
    const selectBranch = this.mybranch.find(item => item.data.id === id)
    if (selectBranch) {
      selectBranch.isSelected = !selectBranch.isSelected
    }
  }
  onSubmit() {
    this.loading.showLoading()
    const sendProducts = [];
    const sendRecipes = [];
    const bodyUpdate:any[] =[];
    const deleteProduct=[]
    const deleteRecipe=[]

    for (let i = 0; i < this.data.products.length; i++) {
      if (this.data.products[i].type === "product") {
        if(this.data.id!=null){
          const data = {
            id: this.data.products[i].product,
            quantity: this.data.products[i].quantity
          }
          sendProducts.push(data)
        }else{
          const data = {
            product: this.data.products[i].product,
            quantity: this.data.products[i].quantity
          }
          sendProducts.push(data)
        }
       
      } else {
        if(this.data.id!=null){
          const data = {
            id: this.data.products[i].product,
            quantity: this.data.products[i].quantity
          }
          sendRecipes.push(data)
        }else{
          const data = {
            previus_recipe: this.data.products[i].product,
            quantity: this.data.products[i].quantity
          }
          sendRecipes.push(data)
        }
      }
    }
    if (this.data.id == null) {
      const body = {
        name: this.data.infoForms.infoForms.nameRecipe,
        price: this.data.infoForms.infoForms.costSale,
        detail: this.data.infoForms.infoForms.description,
        image: this.data.infoForms.image,
        is_base_recipe: true,
        store: this.sendStore,
        category: parseInt(this.data.infoForms.infoForms.category),
        prev_recipes: sendRecipes,
        products: sendProducts
      }
      this.services.postRecipes(body).then((result) => {
        this.loading.hideLoading()
        this.dialogRef.close("Receta agregada con éxito");
      }).catch((err) => {
        this.loading.hideLoading()
      });
    } else {
      const patchBody = {
        name: this.data.infoForms.infoForms.nameRecipe,
        price: this.data.infoForms.infoForms.costSale,
        detail: this.data.infoForms.infoForms.description,
        image: this.data.infoForms.image,
        category: parseInt(this.data.infoForms.infoForms.category),
      }
      const bodyUpdateProducts ={
        method:true,
        products: sendProducts
      }
      bodyUpdate.push(bodyUpdateProducts)
      const bodyUpdateRecipes ={
        method:true,
        prev_recipes: sendRecipes
      }
      bodyUpdate.push(bodyUpdateRecipes)

      for(let i = 0; this.data.deleteProduct.length>i;i++){
        if(this.data.deleteProduct[i].type ==="product"){
          const body ={
            id:this.data.deleteProduct[i].product,
            quantity:this.data.deleteProduct[i].quantity
          }
          deleteProduct.push(body)
        }else{
          const body ={
            id:this.data.deleteProduct[i].id,
            quantity:this.data.deleteProduct[i].quantity
          }
          deleteRecipe.push(body)
        }
      }
      const bodyDeleteProduct ={
        method:false,
        products:deleteProduct
      }
      const bodyDeleteRecipe ={
        method:false,
        prev_recipes:deleteRecipe
      }
      for(let i =0; this.data.listStore.length>i;i++){
        const store = this.sendStore.find((item:any)=>item.store === this.data.listStore[i].id)
        if(store){
          const body={
            method:true,
            store:{
              id:store.store
            }
          }
          bodyUpdate.push(body)
        }else{
          const body ={
            method:false,
            store:{
              id:this.data.listStore[i].id
            }
          }
          bodyUpdate.push(body)
        }
      }
      bodyUpdate.push(bodyDeleteProduct)
      bodyUpdate.push(bodyDeleteRecipe)
      this.services.patchRecipes(patchBody, this.data.id).then((result) => {
        console.log(result)
        console.log("result")
        this.services.postUpdateRecipes(bodyUpdate, this.data.id).then((resultUpdate) => {
          console.log(resultUpdate)
          console.log("resultUpdate")
          this.loading.hideLoading()
          this.dialogRef.close("Receta actualizada con éxito.");
        }).catch((err) => {
          console.log(err)
          this.loading.hideLoading()
        });
      }).catch((err) => {
        console.log(err)
        this.loading.hideLoading()
      });
    }
  }
}
