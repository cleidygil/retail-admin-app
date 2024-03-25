import { Component , inject } from '@angular/core';
import { SuppliesService } from '../../services/supplies.service';
import { MatDialog } from '@angular/material/dialog';
import {DialogDetailRecipesComponent} from '../../components/recipes-all/dialog-detail-recipes/dialog-detail-recipes.component'
@Component({
  selector: 'app-recipes-all',
  templateUrl: './recipes-all.component.html',
  styleUrls: ['./recipes-all.component.css']
})
export class RecipesAllComponent {
  private services = inject(SuppliesService)
  private dialog = inject(MatDialog)

  constructor() { }
  recipesAll: any = []
  dialogDetailRecipes(){
    const dialogo = this.dialog.open(DialogDetailRecipesComponent,{
      data:"",
      width: window.innerWidth >100 ? '50%':'auto',
    })
    dialogo.afterClosed().subscribe(data =>{
      if(data){
        
      }
    })
  }
  
  ngOnInit(): void {
    // this.getAllProducts()
  }
  getAllRecipes(){

  }
}
