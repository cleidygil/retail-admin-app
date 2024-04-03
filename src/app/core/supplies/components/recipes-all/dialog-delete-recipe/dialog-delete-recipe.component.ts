import { Component , Inject, inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete-recipe',
  templateUrl: './dialog-delete-recipe.component.html',
  styleUrls: ['./dialog-delete-recipe.component.css']
})
export class DialogDeleteRecipeComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogDeleteRecipeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){
    
  }
  confirmDelete(data:any){
    this.dialogRef.close(data)
  }
}
