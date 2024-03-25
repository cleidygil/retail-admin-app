import { Component, Inject, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-detail-recipes',
  templateUrl: './dialog-detail-recipes.component.html',
  styleUrls: ['./dialog-detail-recipes.component.css']
})
export class DialogDetailRecipesComponent {
  private dialog = inject(MatDialog)

  constructor(
    public dialogRef: MatDialogRef<DialogDetailRecipesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){  }


}
