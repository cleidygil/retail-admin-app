import { Component ,Input, inject, Output,EventEmitter} from '@angular/core';
import { SuppliesService } from '../../../services/supplies.service';
import { PageEvent } from '@angular/material/paginator';
import { FormGroup, FormControl } from '@angular/forms';
import { LoadingService } from 'src/app/global/services/loading.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ParamsGlobal ,MyRecipeParams } from '../../../interfaces/supplies';

@Component({
  selector: 'app-available-ingredients',
  templateUrl: './available-ingredients.component.html',
  styleUrls: ['./available-ingredients.component.css']
})
export class AvailableIngredientsComponent {
  private services = inject(SuppliesService)
  private loading = inject(LoadingService);
  @Input() datosRecibidos: any;
  @Input() myFiles: any[] = []
  @Input() files: any
  @Output() image = new EventEmitter<string>()
  nextPage: number = 1;
  productsAll: any = []
  count: number = 1
  activeButton:boolean=true
  params = new FormGroup({
    search: new FormControl(''),
  })
  costTotal: number=0
  selectIngredients :any
  search:String =""
  selectProducts: any[] =[];
  sendProducts: any[]=[]
  semdRecipes:any[]=[]
  sub!: Subscription
  id: number | null = null
  listStore:any[]=[]

  private activateRou = inject(ActivatedRoute);
    constructor(){ 
    this.sub = this.activateRou.params.subscribe((data) => {
      this.id = Number(data['id']) || null
    })
   }  
  ngOnInit(): void{
    // this.loading.showLoading()
    if(this.id!=null){
      this.getRecipes()
    }
    this.getAllProducts()
    // this.loading.hideLoading()
  }

  getAll(){
    // this.loading.showLoading()
    if(this.activeButton){
      this.getAllProducts()
    }else{
      this.getAllRecipes()
    }
    // this.loading.hideLoading()
  }
  getAllProducts(){
    this.loading.showLoading()
    const valor = this.params.value
    const params = new ParamsGlobal();
    params.page = this.nextPage
    params.only_prices= true
    if(valor.search !="" && valor.search!=null){
      params.search = valor.search
    }
    this.services.getAllProducts(params).then((result) => {
      this.productsAll = result.results
      this.count = result.count
      this.activeButton = true
      this.loading.hideLoading()
    }).catch((err) => {
      this.loading.hideLoading()
    });
   }
   nextPageIndex(event: PageEvent) {
    this.nextPage = event.pageIndex + 1;
    if(this.activeButton){
      this.getAllProducts()
    }else{
      this.getAllRecipes()
    }
  }
  getAllRecipes(){
    this.loading.showLoading()
    const valor = this.params.value
    const params = new MyRecipeParams();
    params.page = this.nextPage
    if(valor.search !="" && valor.search!=null){
      params.search = valor.search
    }
    this.services.getAllRecipes(params).then((result) => {
      this.productsAll = result.results
      this.count = result.count
      this.activeButton = false
      this.loading.hideLoading()
    }).catch((err) => {
      this.loading.hideLoading()
      console.log(err)
    });
  }
  selectInfo(data:any){
    this.selectIngredients = data;
    const foundIndex = this.selectProducts.findIndex(item => item.id === data.id);
    if (foundIndex === -1) {
      this.selectProducts.push(data)
      this.costTotal += parseInt(data.price, 10);
      let type = data.brand !== undefined ? "product" : "recipe";
      const body = {
        product: data.id,
        quantity: 0,
        type: type,
        id:this.id,
        method:true,
        price:parseInt(data.price, 10)
      };
      this.sendProducts.push(body);
    } else {
      this.selectProducts.splice(foundIndex, 1);
      this.sendProducts.splice(foundIndex, 1);
      this.costTotal -= parseInt(data.price, 10);
    }

  }
  isProductSelected(item: any): boolean {
    return this.selectProducts.some(selectedItem => selectedItem.id === item.id);
  }
  getRecipes(){
    this.loading.showLoading()
    this.services.getRecipe(Number(this.id)).then((result) => { 
      this.listStore =result.store
      if(result.products_recipes.length>0){
        for(let i =0; result.products_recipes.length>i;i++){
           const body={
            id:result.products_recipes[i].product.id,
            name:result.products_recipes[i].product.name,
            image: result.products_recipes[i].product.image,
            sku: result.products_recipes[i].product.sku,
            mu_name: result.products_recipes[i].product.mu_name,
          }
          this.selectProducts.push(body)
          const data = {
            product: result.products_recipes[i].product.id,
            quantity:result.products_recipes[i].quantity,
            type:  "product" ,
            id:this.id,
            method:true
          };
          this.sendProducts.push(data);
          this.costTotal += parseInt(result.products_recipes[i].product.price, 10);
        }
      }
      if(result.previous_recipe.length>0){
        for(let i =0; result.previous_recipe.length>i;i++){
          const body={
            id:result.previous_recipe[i].previus_recipe,
            name:result.previous_recipe[i].name,
            image: result.previous_recipe[i].image,
            sku: result.previous_recipe[i].serial
          }
          this.selectProducts.push(body)
          const data = {
            product: result.previous_recipe[i].previus_recipe,
            quantity: result.previous_recipe[i].quantity,
            type:  "recipe" ,
            id:this.id,
            method:true
          };
          this.sendProducts.push(data);     
          this.costTotal += parseInt(result.products_recipes[i].product.price, 10);     
        }
      }
      this.loading.hideLoading()
    }).catch((err) => {
      this.loading.hideLoading()
      console.log(err)
    });
  }
  actualizarCostoTotal(nuevoCosto: number) {
    // Actualizar la variable costTotal con el nuevo valor
    this.costTotal = nuevoCosto;
  }
}
