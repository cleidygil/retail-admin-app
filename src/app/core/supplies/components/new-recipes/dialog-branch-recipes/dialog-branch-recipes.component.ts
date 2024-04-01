import { Component , Inject, inject} from '@angular/core';
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
  sendStore: any[]=[]
  sendProducts: any[]=[]
  mybranch:any[] =[]
  params = new FormGroup({
    search: new FormControl(''),
    status: new FormControl('')
  })
  constructor(
    public dialogRef: MatDialogRef<DialogBranchRecipesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){
  }
  ngOnInit(): void {
    this.getAllStore()
    this.getAllBranch()
  }
  closeDialog(){
    this.dialogRef.close()
  }
  getAllStore() {
    const params = new MyStoreParams()
    params.parent = 'false'
    this.services.getUserStores(params).then((result) => {
      // this.loading.hideLoading()
      this.mystores = result
      console.log(this.mystores )
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
        const body ={
          data : element,
          isSelected: false
        }
        this.mybranch.push(body)
      });

    }).catch((err) => {
      this.loading.hideLoading()
    });
  }
  selectBranch(id:number){
    for(let i=0; this.mybranch.length>i;++i){
      if(this.mybranch[i].data.id===id){
        this.sendStore.push(this.mybranch[i].data.id.toString())
      }
    }
    const selectBranch = this.mybranch.find(item =>item.data.id ===id)
    if(selectBranch){
      selectBranch.isSelected = !selectBranch.isSelected
    }
  }
  onSubmit(){
    this.loading.showLoading()
    const sendProducts = [];
    const sendRecipes=[];
    for (let i = 0; i < this.data.products.length; i++){
      if(this.data.products[i].type ==="product"){
        const data = {
          product : this.data.products[i].product,
          quantity:this.data.products[i].quantity
        }
        sendProducts.push(data)
      }else{
        const data = {
          previus_recipe : this.data.products[i].product,
          quantity:this.data.products[i].quantity
        }
        sendRecipes.push(data)
      }
    }
    const body={
      name: this.data.infoForms.infoForms.nameRecipe,
      price:this.data.infoForms.infoForms.costSale,
      detail:this.data.infoForms.infoForms.description,
      image:this.data.infoForms.image,
      is_base_recipe:true,
      store:this.sendStore,
      category:parseInt(this.data.infoForms.infoForms.category),
      prev_recipes:sendRecipes,
      products:sendProducts
    }
    this.services.postRecipes(body).then((result) => {
      this.loading.hideLoading()
      this.dialogRef.close("Receta agregada con éxito");
    }).catch((err) => {
      this.loading.hideLoading()
    });
  }
}
