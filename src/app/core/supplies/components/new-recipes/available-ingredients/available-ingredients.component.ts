import { Component ,Input, inject, Output,EventEmitter} from '@angular/core';
import { MyStoreParams } from 'src/app/core/store/interfaces/store';
import { SuppliesService } from '../../../services/supplies.service';
import { PageEvent } from '@angular/material/paginator';
import { FormGroup, FormControl } from '@angular/forms';
import { LoadingService } from 'src/app/global/services/loading.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

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

  private activateRou = inject(ActivatedRoute);

    constructor(){ 
    this.sub = this.activateRou.params.subscribe((data) => {
      this.id = Number(data['id']) || null
    })
   }  
  ngOnInit(): void{
    if(this.id!=null){
      this.getRecipes()
    }
    this.getAllProducts()
  }

  getAll(){
    if(this.activeButton){
      this.getAllProducts()
    }else{
      this.getAllRecipes()
    }
  }
  getAllProducts(){
    this.loading.showLoading()
    const valor = this.params.value
    const params = new MyStoreParams();
    params.page = this.nextPage
    if(valor.search !="" && valor.search!=null){
      params.search = valor.search
    }
    this.services.getAllProducts(params).then((result) => {
      this.loading.hideLoading()
      this.productsAll = result.results
      this.count = result.count
      this.activeButton = true
    }).catch((err) => {
      this.loading.hideLoading()
      console.log(err)
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
    const params = new MyStoreParams();
    params.page = this.nextPage
    if(valor.search !="" && valor.search!=null){
      params.search = valor.search
    }
    this.services.getAllRecipes(params).then((result) => {
      this.loading.hideLoading()
      this.productsAll = result.results
      this.count = result.count
      this.activeButton = false
    }).catch((err) => {
      this.loading.hideLoading()
      // console.log(err)
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
        type: type
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

      console.log(result)
      console.log("result")

      if(result.previous_recipe.length>0){
        for(let i =0; result.previous_recipe.length>i;i++){
          const body={
            id:result.previous_recipe[i].previus_recipe_id,
            name:result.previous_recipe[i].name,
            image: result.previous_recipe[i].image,
            sku: result.previous_recipe[i].serial
          }
          this.selectProducts.push(body)
        }
      }
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
        }
      }
      this.loading.hideLoading()
    }).catch((err) => {
      this.loading.hideLoading()
    });
  }
}
