import { Component, Inject, ViewChild, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-quantity-unit-of-measurement',
  templateUrl: './dialog-quantity-unit-of-measurement.component.html',
  styleUrls: ['./dialog-quantity-unit-of-measurement.component.css']
})
export class DialogQuantityUnitOfMeasurementComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogQuantityUnitOfMeasurementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
   ){}

   
}
