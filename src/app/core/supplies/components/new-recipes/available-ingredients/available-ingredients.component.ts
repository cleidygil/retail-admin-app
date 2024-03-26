import { Component ,Input, inject} from '@angular/core';
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
  constructor()
  {  }  
  ngOnInit(): void{
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
    const params = new MyStoreParams();
    params.page = this.nextPage
    this.services.getAllRecipes(params).then((result) => {
      this.productsAll = result.results
      this.count = result.count
      this.activeButton = false
    }).catch((err) => {
      console.log(err)
    });
  }
  selectInfo(data:any){
    this.selectIngredients =data;
    this.selectProducts.push(data);
    console.log(data.price)
    this.costTotal= this.costTotal + parseInt(data.price)
  }
}
