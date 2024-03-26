import { Component , inject, Input} from '@angular/core';
import { SuppliesService } from '../../../services/supplies.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ParamsGlobal } from '../../../interfaces/supplies';
import { SnackbarService } from 'src/app/global/services/snackbar.service';
import { MyStoreParams } from 'src/app/core/store/interfaces/store';

@Component({
  selector: 'app-recipes-sale',
  templateUrl: './recipes-sale.component.html',
  styleUrls: ['./recipes-sale.component.css']
})
export class RecipesSaleComponent {
  @Input() myFiles: any[] = []
  @Input() files: any
  private services = inject(SuppliesService)
  private router = inject(Router)
  private activateRou = inject(ActivatedRoute);
  private snack = inject(SnackbarService)
  categories: any[] = []
  taxes:any[]=[]
  recipe = new FormGroup({
    'nameRecipe': new FormControl('', [Validators.required]),
    'category': new FormControl<any>('', [Validators.required]),
    'costSale': new FormControl<any>('', [Validators.required]),
    // 'totalCostSale': new FormControl<any>('', [Validators.required]),
    'description': new FormControl<any>('', [Validators.required])
  })
  nextPage: number = 1;
  productsAll: any = []
  count: number = 1

  ngOnInit(): void{
    this.getCategories()
    this.getTaxes()
  }
  getCategories() {
    const params: ParamsGlobal = new ParamsGlobal()
    params.category = 'true'
    this.services.getCategories(params).then((result) => {
      this.categories = result.results
    }).catch((error) => {
      console.log(error)
    })
  }
   getTaxes(){
    const params: ParamsGlobal = new ParamsGlobal()
    params.category = 'true'
    this.services.getAllTax().then((result) =>{
      this.taxes = result
      console.log(this.taxes.length + " result")
    }).catch((error) => {
      console.log(error)
    })
   }
   onSubmit(){
    const valor = this.recipe.value

    const body ={
      name :valor.nameRecipe,
      price: valor.costSale,
      detail:valor.description,
      image:"falta",
      is_base_recipe:"falta",
      store:"falta",
      category:valor.category,
    }
    
    // if (this.files.file == '' && this.files.url == '') {
    //   return this.snack.openSnackBar("Por favor agregar la imagen al producto o una URL de la imagen.")
    // }
    console.log(valor.category)
    console.log(valor.nameRecipe)
   }
   
}
