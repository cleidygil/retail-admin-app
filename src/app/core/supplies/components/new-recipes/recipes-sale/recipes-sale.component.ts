import { Component , inject, Input} from '@angular/core';
import { SuppliesService } from '../../../services/supplies.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ParamsGlobal } from '../../../interfaces/supplies';
import { SnackbarService } from 'src/app/global/services/snackbar.service';

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
    'taxes': new FormControl<any>('', [Validators.required]),
    'costSale': new FormControl<any>('', [Validators.required]),
    'serial': new FormControl<any>('', [Validators.required]),
    'totalCostSale': new FormControl<any>('', [Validators.required]),
    'description': new FormControl<any>('', [Validators.required])
  })
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
    // if (this.files.file == '' && this.files.url == '') {
    //   return this.snack.openSnackBar("Por favor agregar la imagen al producto o una URL de la imagen.")
    // }
    const valor = this.recipe.value
    console.log(valor.category)
    console.log(valor.serial)
    console.log(valor.nameRecipe)
    console.log(valor.taxes)

   }
}
