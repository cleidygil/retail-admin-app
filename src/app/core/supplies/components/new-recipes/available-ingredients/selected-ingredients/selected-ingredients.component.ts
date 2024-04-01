import { Component , Inject,Input, ViewChild, inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { DialogQuantityUnitOfMeasurementComponent } from '../../dialog-quantity-unit-of-measurement/dialog-quantity-unit-of-measurement.component';
import {DialogBranchRecipesComponent} from '../../dialog-branch-recipes/dialog-branch-recipes.component'
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/global/services/snackbar.service';

@Component({
  selector: 'app-selected-ingredients',
  templateUrl: './selected-ingredients.component.html',
  styleUrls: ['./selected-ingredients.component.css']
})
export class SelectedIngredientsComponent {
  private dialog = inject(MatDialog)
  private snack = inject(SnackbarService)
  private router = inject(Router)
  @Input() info: any;
  @Input() selectProducts: any[] =[];
  @Input() sendProducts: any[] =[];
  @Input() infoForms: any;
  senRecipes:any[]= []

  ngOnInit(): void {
    // console.log(this.info + " prueba")
  }
  addQuantify(id:number){
    
    const dialogo = this.dialog.open(DialogQuantityUnitOfMeasurementComponent,{
      data:id,
      width: window.innerWidth >100 ? '20%':'auto',
    })
    dialogo.afterClosed().subscribe(data =>{
      if(data){
        const productoAModificar = this.sendProducts.find(item =>item.product ===data.id)
        productoAModificar.quantity = data.quantity      
      }
    })
  }
  // selectBranch(){
  //   const body ={
  //     infoForms:this.infoForms,
  //     products: this.sendProducts
  //   }
  //   if(this.infoForms.image ==="" || this.infoForms.image ===undefined || this.infoForms.image ===null){
  //     this.snack.openSnackBar("Por favor seleccionar una imagen.");
  //   }else if(this.infoForms.infoForms ===null ||this.infoForms.infoForms===undefined || this.infoForms.infoForms.nameRecipe ===""   ){
  //     this.snack.openSnackBar("Por favor escribir un nombre.");
  //   }else if(this.infoForms.infoForms.category ===""){
  //     this.snack.openSnackBar("Por favor escribir una categoria.");
  //   }else if(this.infoForms.infoForms.costSale ===""){
  //     this.snack.openSnackBar("Por favor escribir el precio.");
  //   }else if(this.infoForms.infoForms.description ===""){
  //     this.snack.openSnackBar("Por favor escribir la descripción.");
  //   }else if (  this.sendProducts.length===0){
  //     this.snack.openSnackBar("Por favor seleccionar un producto para la receta.");
  //   }else{
  //     const dialog = this.dialog.open(
  //       DialogBranchRecipesComponent,{
  //         data:body,
  //         width: window.innerWidth >100 ? '50%':'auto',  
  //       }
  //     )
  //     dialog.afterClosed().subscribe(data =>{
  //       if(data){
  //         this.snack.openSnackBar(data);
  //         this.router.navigate(['/home/supplies/recipes'])
  //       }
  //     })
  //   }
  // }
  deleteProducts(index: number){
    this.selectProducts.splice(index,1)
    this.sendProducts.splice(index,1)
  }
  selectBranch(): void {
    console.log(this.infoForms)
    console.log("this.infoForms")
    const { infoForms } = this.infoForms;
    const { nameRecipe, category, costSale, description } = infoForms ?? {};
  
      if (this.infoForms.image ==="" || this.infoForms.image ===undefined || this.infoForms.image ===null) {
      this.snack.openSnackBar("Por favor seleccionar una imagen.");
    } else if (!nameRecipe) {
      this.snack.openSnackBar("Por favor escribir un nombre.");
    } else if (!category) {
      this.snack.openSnackBar("Por favor escribir una categoria.");
    } else if (!costSale) {
      this.snack.openSnackBar("Por favor escribir el precio.");
    } else if (!description) {
      this.snack.openSnackBar("Por favor escribir la descripción.");
    } else if (this.sendProducts.length === 0) {
      this.snack.openSnackBar("Por favor seleccionar un producto para la receta.");
    } else {
      this.openDialog();
    }
  }
  
  openDialog(): void {
    const body = {
      infoForms: this.infoForms,
      products: this.sendProducts
    };
    const dialog = this.dialog.open(DialogBranchRecipesComponent, {
      data: body,
      width: window.innerWidth > 100 ? '50%' : 'auto'
    });
  
    dialog.afterClosed().subscribe(data => {
      if (data) {
        this.handleDialogClose(data);
      }
    });
  }
  
  handleDialogClose(data: any): void {
    this.snack.openSnackBar(data);
    this.router.navigate(['/home/supplies/recipes']);
  }
}
