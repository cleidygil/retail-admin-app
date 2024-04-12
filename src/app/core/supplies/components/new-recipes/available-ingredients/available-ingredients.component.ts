import { Component ,Input, inject, Output,EventEmitter} from '@angular/core';
import { SuppliesService } from '../../../services/supplies.service';
import { PageEvent } from '@angular/material/paginator';
import { FormGroup, FormControl } from '@angular/forms';
import { LoadingService } from 'src/app/global/services/loading.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ParamsGlobal ,MyRecipeParams } from '../../../interfaces/supplies';
import { SnackbarService } from 'src/app/global/services/snackbar.service';

@Component({
  selector: 'app-available-ingredients',
  templateUrl: './available-ingredients.component.html',
  styleUrls: ['./available-ingredients.component.css']
})
export class AvailableIngredientsComponent {
  private services = inject(SuppliesService)
  private loading = inject(LoadingService);
  private snack = inject(SnackbarService)

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
  @Output() costTotalChanged = new EventEmitter<number>();

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
    // this.loading.showLoading()
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
      // this.loading.hideLoading()
    }).catch((err) => {
      // this.loading.hideLoading()
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
    // this.loading.showLoading()
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
      // this.loading.hideLoading()
    }).catch((err) => {
      // this.loading.hideLoading()
      console.log(err)
    });
  }
  selectInfo(data:any){
    this.selectIngredients = data;
    const foundIndex = this.selectProducts.findIndex(item => item.id === data.id);
    if (foundIndex === -1) {
      this.selectProducts.push(data)
      // this.costTotal += parseInt(data.price, 10);
      let type = data.brand !== undefined ? "product" : "recipe";
      const body = {
        product: data.id,
        quantity: 0,
        type: type,
        id:data.id,
        method:true,
        name:data.name,
        image:data.image,
        mu_name: data.mu_name,
        serial: data.brand !== undefined ? data.sku : data.serial,
        price:parseInt(data.price, 10)
      };
      this.costTotal += body.quantity;

      this.sendProducts.push(body);
    } else {
      const data = this.sendProducts[foundIndex]
      const valor= data?.price ? parseFloat(data.price) * data?.quantity : 0
      this.costTotal -= valor;
      this.selectProducts.splice(foundIndex, 1);
      this.sendProducts.splice(foundIndex, 1);
    }
  }
  isProductSelected(item: any): boolean {
    return this.selectProducts.some(selectedItem => selectedItem.id === item.id);
  }
  getRecipes(){
    // this.loading.showLoading()
    this.services.getRecipe(Number(this.id)).then((result) => { 
      this.listStore =result.store
      result.products_recipes.forEach((item:any)=>{
        const { product } = item;
        const { id, name, image, sku, mu_name } = product;
        const body = {
          id:id,
          name:name,
          image:image,
          sku: sku,
          mu_name:mu_name
        };
        this.selectProducts.push(body);
        const data = {
          product: id,
          quantity: item.quantity,
          type: "product",
          id:id,
          method: true,
          image:image,
          serial: sku,
          name:name,
          mu_name:mu_name
        };
        this.sendProducts.push(data);
        this.costTotal += parseInt(product.price, 10);
      })
      result.previous_recipe.forEach((item:any) => {
        const { previus_recipe, name, image, serial } = item;
        
        const body = {
          id: previus_recipe,
          name:name,
          image:image,
          sku: serial
        };
        this.selectProducts.push(body);
  
        const data = {
          product: previus_recipe,
          quantity: item.quantity,
          type: "recipe",
          id: previus_recipe,
          method: true,
          name:name,
          image:image,
          sku: serial
        };
        this.sendProducts.push(data);     
        this.costTotal += parseInt(item.price, 10);     
      });
      // this.loading.hideLoading()
    }).catch((err) => {
      // this.loading.hideLoading()
      this.snack.openSnackBar("Ocurrió un error, por favor intente de nuevo.");
      console.log(err)
    });
  }
  actualizarCostoTotal(nuevoCosto: number) {
    // Actualizar la variable costTotal con el nuevo valor
    this.costTotal = nuevoCosto;
    this.costTotalChanged.emit(this.costTotal);
  }
}
