import { Component ,Input, inject, Output,EventEmitter} from '@angular/core';
import { MyStoreParams } from 'src/app/core/store/interfaces/store';
import { SuppliesService } from '../../../services/supplies.service';
import { PageEvent } from '@angular/material/paginator';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-available-ingredients',
  templateUrl: './available-ingredients.component.html',
  styleUrls: ['./available-ingredients.component.css']
})
export class AvailableIngredientsComponent {
  private services = inject(SuppliesService)
  @Input() datosRecibidos: any;
  @Input() myFiles: any[] = []
  @Input() files: any
  @Output() image = new EventEmitter<string>()

  // @Input() data: any; // La propiedad que se enviará al componente hijo
  nextPage: number = 1;
  productsAll: any = []
  count: number = 1
  activeButton:boolean=true
  params = new FormGroup({
    search: new FormControl(''),
    // status: new FormControl('')
  })
  costTotal: number=0
  selectIngredients :any
  search:String =""
  selectProducts: any[] =[];
  sendProducts: any[]=[]
  semdRecipes:any[]=[]
    constructor()
  {  }  
  ngOnInit(): void{
    this.getAllProducts()
  }
  // recibirDatos(datos: any) {
  //   const data ={
  //     infoFomrs:datos,
  //     image:this.files
  //   }
  //   this.datosRecibidos = data;
  //   console.log(this.datosRecibidos)
  //   console.log("this.datosRecibidos")

  // }
  getAll(){
    if(this.activeButton){
      this.getAllProducts()
    }else{
      this.getAllRecipes()
    }
  }
  getAllProducts(){
    const valor = this.params.value
    const params = new MyStoreParams();
    params.page = this.nextPage
    if(valor.search !="" && valor.search!=null){
      params.search = valor.search
    }
    this.services.getAllProducts(params).then((result) => {
      this.productsAll = result.results
      this.count = result.count
      this.activeButton = true
    }).catch((err) => {
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
    const valor = this.params.value
    const params = new MyStoreParams();
    params.page = this.nextPage
    if(valor.search !="" && valor.search!=null){
      params.search = valor.search
    }
    this.services.getAllRecipes(params).then((result) => {
      this.productsAll = result.results
      this.count = result.count
      this.activeButton = false
    }).catch((err) => {
      console.log(err)
    });
  }
  selectInfo(data:any){
    this.selectIngredients = data;
    const foundIndex = this.selectProducts.findIndex(item => item.id === data.id);
  
    if (foundIndex === -1) {
      this.selectProducts.push(data);
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
}
