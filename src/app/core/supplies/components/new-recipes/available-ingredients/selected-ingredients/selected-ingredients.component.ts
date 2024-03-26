import { Component , Inject,Input, ViewChild, inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { DialogQuantityUnitOfMeasurementComponent } from '../../dialog-quantity-unit-of-measurement/dialog-quantity-unit-of-measurement.component';
import {DialogBranchRecipesComponent} from '../../dialog-branch-recipes/dialog-branch-recipes.component'
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-selected-ingredients',
  templateUrl: './selected-ingredients.component.html',
  styleUrls: ['./selected-ingredients.component.css']
})
export class SelectedIngredientsComponent {
  private dialog = inject(MatDialog)
  @Input() info: any;
  @Input() selectProducts: any[] =[];
  
  ngOnInit(): void {
    // console.log(this.info + " prueba")
  }
  addQuantify(){
    const dialogo = this.dialog.open(DialogQuantityUnitOfMeasurementComponent,{
      data:"",
      width: window.innerWidth >100 ? '20%':'auto',
    
    })
    dialogo.afterClosed().subscribe(data =>{
      if(data){
        
      }
    })
  }
  selectBranch(){
    const dialog = this.dialog.open(
      DialogBranchRecipesComponent,{
        data:"",
        width: window.innerWidth >100 ? '50%':'auto',  
      }
    )
    dialog.afterClosed().subscribe(data =>{
      if(data){
        
      }
    })
  }
  deleteProducts(index: number){
    this.selectProducts.splice(index,1)
  }
}
