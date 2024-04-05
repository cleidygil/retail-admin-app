import { Component, Inject, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { AllStore, MyStoreParams } from '../../../interfaces/supplies';
import { SuppliesService } from '../../../services/supplies.service';
import {DialogDeleteRecipeComponent} from '../dialog-delete-recipe/dialog-delete-recipe.component'
import { SnackbarService } from 'src/app/global/services/snackbar.service';

@Component({
  selector: 'app-dialog-detail-recipes',
  templateUrl: './dialog-detail-recipes.component.html',
  styleUrls: ['./dialog-detail-recipes.component.css']
})
export class DialogDetailRecipesComponent {
  private dialog = inject(MatDialog)
  private services = inject(SuppliesService)
  private snack = inject(SnackbarService)
  mystores: AllStore[] = []
  params = new FormGroup({
    costSale: new FormControl(''),
    detail: new FormControl(''),
  })
  constructor(
    public dialogRef: MatDialogRef<DialogDetailRecipesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){  }
  ngOnInit(): void {
    this.getAllStore()
  }
  getAllStore() {
    const params = new MyStoreParams()
    params.parent = 'false'
    this.services.getUserStores(params).then((result) => {
      this.mystores = result
    }).catch((err) => {
      // this.loading.hideLoading()
    });
  }
  editRecipes(){
    this.dialogRef.close("edit");
  }
  deleteRecipe(){
    const dialogo = this.dialog.open(DialogDeleteRecipeComponent,{
      data:"",
      width: window.innerWidth >100 ? '20%':'auto',
    })
    dialogo.afterClosed().subscribe(data =>{
      if(data){
        this.services.deleteRecipes(this.data.recipe.id).then((result) =>{  
          this.snack.openSnackBar("Receta eliminada con éxito.");
          this.dialogRef.close("delete")
        }).catch((err:any) => {
          this.snack.openSnackBar("Ocurrió un error, por favor intente de nuevo.");
           this.snack.openSnackBar(err);
        });
      }
    })
  }
}
