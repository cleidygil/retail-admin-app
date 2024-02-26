import { Component, Inject, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/global/services/snackbar.service';
import { StoreService } from '../../../services/store.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MethosdParams } from '../../../interfaces/store';

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
    payment_methods: new FormControl<any>('', [Validators.required]),
    // bank: new FormControl<any>('', [Validators.required]),
    // bank_account: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.pattern('[0-9]*')]),
    // email: new FormControl('', [Validators.required, Validators.email]),
  })
  methods_arr: any[] = []
  payment_methods_arr: any[] = []
  payment_methods: any[] = []

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
    const valor = this.payments.value
    let body = {
      "payment_method": valor.payment_methods,
      "method": true
    }
    console.log(body)
   
      this.services.postMyStorePaymentMethods(body, this.data.id).then((res) => {
        this.dialogRef.close(true)
        this.snack.openSnackBar("Actualizado exitosamente")
      }).catch((error) => {
        this.snack.openSnackBar(error.error.message)
      })
      return
   
  }
}
