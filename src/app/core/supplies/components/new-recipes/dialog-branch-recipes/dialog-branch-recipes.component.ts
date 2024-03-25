import { Component , Inject, inject} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-branch-recipes',
  templateUrl: './dialog-branch-recipes.component.html',
  styleUrls: ['./dialog-branch-recipes.component.css']
})
export class DialogBranchRecipesComponent {
  private dialog = inject(MatDialog)

  constructor(
    public dialogRef: MatDialogRef<DialogBranchRecipesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){
  }
  closeDialog(){
    this.dialogRef.close()
  }
  
}
