import { Component , inject, Input, Output, EventEmitter } from '@angular/core';
import { SuppliesService } from '../../../services/supplies.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
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
  @Output() image = new EventEmitter<string>()
  @Output() datosEnviados = new EventEmitter<any>();

  private services = inject(SuppliesService)
  private router = inject(Router)
  private activateRou = inject(ActivatedRoute);
  private snack = inject(SnackbarService)
  categories: any[] = []
  taxes:any[]=[]
  recipe: FormGroup = new FormGroup({});
  nextPage: number = 1;
  productsAll: any = []
  count: number = 1

  constructor(private formBuilder: FormBuilder){
    this.recipe = this.formBuilder.group({
      nameRecipe: '',
      category: ['', Validators.required],
      costSale: '',
      description: '',
    });
    this.recipe.valueChanges.subscribe(value => {
      this.datosEnviados.emit(value);
    });
  }

  ngOnInit(): void{
    this.getCategories()
  }

  getCategories() {
    const params: ParamsGlobal = new ParamsGlobal()
    params.category = 'true'
    params.type =3
    this.services.getCategories(params).then((result) => {
      this.categories = result.results
    }).catch((error) => {
      console.log(error)
    })
  }
}
