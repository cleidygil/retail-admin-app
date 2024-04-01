import { Component , inject } from '@angular/core';
import { SuppliesService } from '../../services/supplies.service';
import { MatDialog } from '@angular/material/dialog';
import { MyStoreParams } from 'src/app/core/store/interfaces/store';
import {DialogDetailRecipesComponent} from '../../components/recipes-all/dialog-detail-recipes/dialog-detail-recipes.component'
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { LoadingService } from 'src/app/global/services/loading.service';

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

  recipesAll: any = []
  params = new FormGroup({
    search: new FormControl(''),
  })
  constructor(
    // private router: Router
  ) { }
  ngOnInit(): void {
    this.getAllRecipes()
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
          width: window.innerWidth >100 ? '50%':'auto',
        })
        dialogo.afterClosed().subscribe(data =>{
          if(data){
            this.router.navigate(['/home/supplies/recipes/'+ result.id]);
          }
        })
      }).catch((err) => {
        this.loading.hideLoading()
      });
    }).catch((err) => {
      this.loading.hideLoading()
      console.log(err)
    });

 
  }
  
  getAllRecipes(){
    this.loading.showLoading()
    const valor = this.params.value
    const params = new MyStoreParams()
    if(valor.search !="" && valor.search!=null){
      params.search = valor.search
    }
    this.services.getAllRecipes(params).then((result) => {
      this.recipesAll = result.results
      this.loading.hideLoading()
      if(this.recipesAll.length ===0){
        this.router.navigate(['/home/supplies/recipes/new_recipes'])
      }
    }).catch((err) => {
      this.loading.hideLoading()
      console.log(err)
    });
  }
}
