import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Shopping } from 'src/app/core/shopping/interface/shopping';
import { StoreService } from 'src/app/core/store/services/store.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';
import { EntryAndExitService } from '../../../services/entry-and-exit.service';

@Component({
  selector: 'app-purchase-data',
  templateUrl: './purchase-data.component.html',
  styleUrls: ['./purchase-data.component.css']
})
export class PurchaseDataComponent {
  @Output() value1 = new EventEmitter<any>()
  private services = inject(EntryAndExitService)

  private snack = inject(SnackbarService)
  private store = inject(StoreService)
  supplierform = new FormGroup({
    'nrofactura': new FormControl<any>('', [Validators.required, Validators.maxLength(10)]),
    'datepay': new FormControl<any>('', [Validators.required]),
    'method': new FormControl<any>('', [Validators.required]),
    'nroref': new FormControl<any>('',),
    'amount': new FormControl<any>('', [Validators.required, Validators.minLength(0)]),
  })
  methodArr: any[] = []
  ngOnInit(): void {
    this.getMethods()
    if (this.services.paso1.value != null) {
      let valor = this.services.paso1.value
      this.supplierform.patchValue({
        nrofactura: valor.nrofactura,
        datepay: valor.datepay,
        method: valor.method,
        nroref: valor.nroref,
        amount: valor.amount,

      })
    }
    this.supplierform.valueChanges.subscribe(valor => {
      if (this.supplierform.valid) {
        this.value1.emit(valor)
        this.services.paso1.next(valor)
      }
    })

  }
  getMethods() {
    const params: Shopping = new Shopping()
    this.store.getPaymentMethods(params).then((result) => {
      this.methodArr = result
    }).catch((error) => {
      console.log(error)
    })
  }
  onSubmit() {
    const data = this.supplierform.value
    this.value1.emit(data)
    this.services.paso1.next(data)
  }
}
