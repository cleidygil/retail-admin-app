import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-alert-products',
  templateUrl: './dialog-alert-products.component.html',
  styleUrls: ['./dialog-alert-products.component.css']
})
export class DialogAlertProductsComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogAlertProductsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
}
