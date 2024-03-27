import { Component, Inject, ViewChild, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-quantity-unit-of-measurement',
  templateUrl: './dialog-quantity-unit-of-measurement.component.html',
  styleUrls: ['./dialog-quantity-unit-of-measurement.component.css']
})
export class DialogQuantityUnitOfMeasurementComponent {
  quantity = new FormGroup({
    'quantity': new FormControl('', [Validators.required]),
  })

  constructor(
    public dialogRef: MatDialogRef<DialogQuantityUnitOfMeasurementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
   ){}
   onConfirmClick() {
    this.dialogRef.close(this.quantity); // Close the dialog and emit the selected quantity
  }
   onSubmit(){
    const valor = this.quantity.value
    const body ={
      id: this.data,
      quantity:valor.quantity
    }
    this.dialogRef.close(body);
   }
}
