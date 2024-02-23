import { Component, Inject, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/global/services/snackbar.service';
import { StoreService } from '../../../services/store.service';
import { MethosdParams } from '../../../interfaces/store';

@Component({
  selector: 'app-dialog-add-store',
  templateUrl: './dialog-add-store.component.html',
  styleUrls: ['./dialog-add-store.component.css']
})
export class DialogAddStoreComponent {
  private services = inject(StoreService)
  private snack = inject(SnackbarService)
  constructor(public dialogRef: MatDialogRef<DialogAddStoreComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  storeForm = new FormGroup({
    'rif': new FormControl('', [Validators.required]),
    'name': new FormControl('', [Validators.required]),
    'address': new FormControl('', [Validators.required]),
    'phone': new FormControl('', [Validators.required,Validators.maxLength(11), Validators.pattern('[0-9]*')]),
    // 'parent': new FormControl('', [Validators.required]),
    'localphone': new FormControl('', [Validators.required, Validators.maxLength(11), Validators.pattern('[0-9]*')]),
    'description': new FormControl('', [Validators.required]),
    'currency': new FormControl('', [Validators.required])
  })
  methodsform = new FormGroup({
    payment_methods: new FormControl<any>('', [Validators.required]),
    bank: new FormControl<any>('', [Validators.required]),
    bank_account: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.pattern('[0-9]*')]),
    email: new FormControl('', [Validators.required, Validators.email]),
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
  addPaymentMethod(){
    const valor= this.methodsform.value
    console.log(valor)
    let show=  {
      "payment_method": valor.payment_methods,
      "bank":  valor.bank,
      "bank_account": valor.bank_account,
      "email": valor.email
    }
    let set=  {
      "payment_method": valor.payment_methods.id,
      "bank":  valor.bank.id,
      "bank_account": valor.bank_account,
      "email": valor.email
    }
    this.payment_methods_arr.push(show)
    this.payment_methods.push(set)
    this.methodsform.reset()
    this.snack.openSnackBar("Agregado a la lista de metodos")
  }
  resetPayMet(indice: number): void {
    this.payment_methods_arr = this.payment_methods_arr.filter((fil: string, i: number) => i !== indice);
    this.payment_methods = this.payment_methods
    .filter((fil: string, i: number) => i !== indice);
 
  }
  onSubmit() {
    const valor = this.storeForm.value
    let body = {
      "rif": valor.rif,
      "name": valor.name,
      "address": valor.address,
      "phone": valor.phone,
      "parent": 1,
      "localphone": valor.localphone,
      "description": valor.description,
      "payment_methods": this.payment_methods,
      "currency": valor.currency
    }
    console.log(body)
    this.services.setMyStore(body).then((res) => {
      this.dialogRef.close(true)
      this.snack.openSnackBar("Tienda creada exitosamente")
    }).catch((error) => {
      this.snack.openSnackBar("Ocurrio un error, por favor intente nuevamente")
    })
  }

}
