import { Component, Inject, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/global/services/snackbar.service';
import { StoreService } from '../../../services/store.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Methods, MethosdParams } from '../../../interfaces/store';

@Component({
  selector: 'app-dialog-payments-methods',
  templateUrl: './dialog-payments-methods.component.html',
  styleUrls: ['./dialog-payments-methods.component.css']
})
export class DialogPaymentsMethodsComponent {
  private services = inject(StoreService)
  private snack = inject(SnackbarService)
  constructor(public dialogRef: MatDialogRef<DialogPaymentsMethodsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  values: any
  methods_arr: any[] = []
  methods_selected = new FormControl<Methods | null>(null)
  ngOnInit(): void {
    this.getMethods()
  }
  getMethods() {
    const params: MethosdParams = new MethosdParams()
    this.services.getPaymentMethods(params).then((result) => {
      this.methods_arr = result
    }).catch((error) => {
      console.log(error)
    })
  }
  onSubmit() {

    let body={
      payment_methods:[this.methods_selected.value?.id],
      method: true
    }
    let body2 = {...body, ...this.values}
    this.services.postMyStorePaymentMethods(body2, this.data?.id).then((res) => {
      this.dialogRef.close(true)
      this.snack.openSnackBar("Actualizado exitosamente")
    }).catch((error) => {
      this.snack.openSnackBar("Ocurrio un error, por favor intente nuevamente")
      this.snack.openSnackBar(error.error.message)
    })

  }

}
