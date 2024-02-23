import { Component, Inject, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/global/services/snackbar.service';
import { StoreService } from '../../../services/store.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-payments-methods',
  templateUrl: './dialog-payments-methods.component.html',
  styleUrls: ['./dialog-payments-methods.component.css']
})
export class DialogPaymentsMethodsComponent {
  private services = inject(StoreService)
  private snack = inject(SnackbarService)
  constructor(public dialogRef: MatDialogRef<DialogPaymentsMethodsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  payments = new FormGroup({
    selected: new FormControl('', [Validators.required])
})

onSubmit() {
  const form = this.payments.value
  let body = {
   name:''
  }
  if (this.data != '') {
    this.services.patchBrandID(body, this.data.id).then((res) => {
      this.dialogRef.close(true)
      this.snack.openSnackBar("Actualizado exitosamente")
    }).catch((error) => {
      this.snack.openSnackBar(error.error.message)
    })
    return
  }
  this.services.setBrands(body).then((res) => {
    console.log(res, 'res')
    this.dialogRef.close(true)
    this.snack.openSnackBar("Agregado exitosamente")
  }).catch((error) => {
    this.snack.openSnackBar(error.error.message)
  })
  return
}
}
