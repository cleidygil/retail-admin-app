import { Component , inject, Input, Output, EventEmitter } from '@angular/core';
import { SuppliesService } from '../../../services/supplies.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ParamsGlobal } from '../../../interfaces/supplies';
import { SnackbarService } from 'src/app/global/services/snackbar.service';
import { MyStoreParams } from 'src/app/core/store/interfaces/store';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/global/services/loading.service';

@Component({
  selector: 'app-recipes-sale',
  templateUrl: './recipes-sale.component.html',
  styleUrls: ['./recipes-sale.component.css']
})
export class RecipesSaleComponent {
  @Input() myFiles: any[] = []
  @Input() files: any
  @Output() image = new EventEmitter<string>()
  @Output() datosEnviados = new EventEmitter<any>();
  private loading = inject(LoadingService);
  private services = inject(SuppliesService)
  private router = inject(Router)
  private activateRou = inject(ActivatedRoute);
  private snack = inject(SnackbarService)
  categories: any[] = []
  taxes:any[]=[]
  recipe: FormGroup = new FormGroup({});
  nextPage: number = 1;
  @Input() costTotal:number=0;
  productsAll: any = []
  count: number = 1
  sub!: Subscription
  id: number | null = null
  idCategory?: number
  valueTypeProduct?:any
  type:any =[
    {
      id:1,
      name:"Final"
    },
    {
      id:2,
      name:"Intermedio"
    }
  ]
  constructor(private formBuilder: FormBuilder){
    this.recipe = this.formBuilder.group({
      nameRecipe:  '',
      category: ['', Validators.required],
      typeProduct:'',
      costSale:  '',
      hoursMen:'',
      description:  '',
      image:  '',
    });
    this.recipe.valueChanges.subscribe(value => {
      this.datosEnviados.emit(value);
    });
    this.sub = this.activateRou.params.subscribe((data) => {
      this.id = Number(data['id']) || null
    })
  }

  ngOnInit(): void{
    // this.loading.showLoading()
    this.getCategories()
    if(this.id !=null){
      this.getRecipe()
    }
    // this.loading.hideLoading()
  }

  getCategories() {
    const params: ParamsGlobal = new ParamsGlobal()
    params.category = 'true'
    params.type =3
    this.services.getCategories(params).then((result) => {
      this.categories = result.results
    }).catch((error) => {
    })
  }
  getRecipe(){
    // this.loading.showLoading()
    this.services.getRecipe(Number(this.id)).then((result) => {
      this.recipe.patchValue({
        nameRecipe: result.name,
        category:result.category,
        costSale: result.price,
        description:result.detail,
        image:result.image,
        hoursMen:result.hour_work
      })
      this.valueTypeProduct= result.is_base_recipe ?1:2
      this.idCategory=result.category
      this.image.emit(result.image)
      // this.loading.hideLoading()

    }).catch((err) => {
      this.snack.openSnackBar("Ocurrió un error, por favor intente de nuevo.");
      console.log(err)
    });
  }
}
