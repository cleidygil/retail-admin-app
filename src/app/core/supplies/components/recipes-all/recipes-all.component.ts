import { Component , inject } from '@angular/core';
import { SuppliesService } from '../../services/supplies.service';
import { MatDialog } from '@angular/material/dialog';
import { MyStoreParams } from 'src/app/core/store/interfaces/store';
import {DialogDetailRecipesComponent} from '../../components/recipes-all/dialog-detail-recipes/dialog-detail-recipes.component'
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes-all',
  templateUrl: './recipes-all.component.html',
  styleUrls: ['./recipes-all.component.css']
})
export class RecipesAllComponent {
  private services = inject(SuppliesService)
  private dialog = inject(MatDialog)
  private router = inject(Router)
  recipesAll: any = []

  constructor(
    // private router: Router
  ) { }
  ngOnInit(): void {
    this.getAllRecipes()
  }
  
  dialogDetailRecipes(data:any){
    const dialogo = this.dialog.open(DialogDetailRecipesComponent,{
      data:data,
      width: window.innerWidth >100 ? '50%':'auto',
    })
    dialogo.afterClosed().subscribe(data =>{
      if(data){
        
      }
    })
  }
  
  getAllRecipes(){
    const params = new MyStoreParams()
    this.services.getAllRecipes(params).then((result) => {
      this.recipesAll = result.results
      if(this.recipesAll.length ===0){
        this.router.navigate(['/home/supplies/recipes/new_recipes'])
      }
      console.log(this.recipesAll)
    }).catch((err) => {
      console.log(err)
    });
  }
}
