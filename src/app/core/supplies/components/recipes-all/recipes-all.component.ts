import { Component , inject } from '@angular/core';
import { SuppliesService } from '../../services/supplies.service';
import { MatDialog } from '@angular/material/dialog';
import { MyStoreParams } from 'src/app/core/store/interfaces/store';
import {DialogDetailRecipesComponent} from '../../components/recipes-all/dialog-detail-recipes/dialog-detail-recipes.component'
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { LoadingService } from 'src/app/global/services/loading.service';
import { PageEvent } from '@angular/material/paginator';
import { ParamsGlobal ,MyRecipeParams } from '../../interfaces/supplies';

@Component({
  selector: 'app-recipes-all',
  templateUrl: './recipes-all.component.html',
  styleUrls: ['./recipes-all.component.css']
})
export class RecipesAllComponent {
  private services = inject(SuppliesService)
  private dialog = inject(MatDialog)
  private router = inject(Router)
  private loading = inject(LoadingService);
  nextPage: number = 1;
  nextPageCategory: number = 1;
  count: number = 1
  countCategory: number = 1
  categorySelect = new FormGroup({
    category: new FormControl<string | null>(null) 
  })
  nextPageProd: number = 1;
  pageIndex: number = 10
  recipesAll:any = []
  categoryAll:any =[]
  params = new FormGroup({
    search: new FormControl(''),
  })
  constructor(
    // private router: Router
  ) { }
  ngOnInit(): void {
    this.getAllRecipes()
    this.getCategory()
  }
  
  dialogDetailRecipes(data:any){
    this.loading.showLoading()
    this.services.getRecipe(data.id).then((result) => {
      const params = new MyStoreParams()
      params.parent = 'false'
      this.services.getUserStores(params).then((storeResult) => {
        this.loading.hideLoading()
        const body= {
          recipe:result,
          storeMain:storeResult
        }
        const dialogo = this.dialog.open(DialogDetailRecipesComponent,{
          data:body,
          width: window.innerWidth >100 ? '500px':'auto',
        })
        dialogo.afterClosed().subscribe(data =>{
          if(data==="edit"){
            this.router.navigate(['/home/supplies/recipes/'+ result.id]);
          }else if(data ==="delete"){
            this.recipesAll.splice(0, this.recipesAll.length)
            this.getAllRecipes()
          }
        })
      }).catch((err) => {
        this.loading.hideLoading()
      });
    }).catch((err) => {
      this.loading.hideLoading()
    }); 
  }
  getCategory(){
    const params: ParamsGlobal = new ParamsGlobal()
    params.page = this.nextPageCategory
    params.category = 'true'
    params.type =3
    this.services.getCategories(params).then((result) => {
      this.categoryAll = result.results
      this.countCategory = result.count
      this.pageIndex = Math.ceil(Number(result.count) / 10)
    }).catch((error) => {
      console.log(error)
    })
  }
  prevPageIndex() {
    if (this.nextPageCategory > 1) {
      this.nextPageCategory = 1
      this.getCategory()
      return
    }
  }
  getAllRecipes(id:number =0){
    this.loading.showLoading()
    const params = new MyRecipeParams()
    params.page = this.nextPage
    this.categorySelect.get('category')?.setValue(null)
    if(id !=0){
      params.category =id 
    }
    this.categorySelect.value?.category
    params.search = this.params.value?.search|| '';
    this.services.getAllRecipes(params).then((result) => {
      this.recipesAll = result.results
      this.count = result.count
      this.loading.hideLoading()
      // if(this.recipesAll.length ===0){
      //   this.router.navigate(['/home/supplies/recipes/new_recipes'])
      // }
    }).catch((err) => {
      this.loading.hideLoading()
      console.log(err)
    });
  }


  nextPageIndex(event: PageEvent) {
    this.nextPage = event.pageIndex + 1;
    this.getAllRecipes()
  }
  pageNext() {
    if (this.nextPageCategory < this.pageIndex) {
      this.nextPageCategory = this.nextPageCategory + 1
      this.getCategory()
      return
    }
  }
}
