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

  supplierform = new FormGroup({
    'nrofactura': new FormControl<any>('', [Validators.required, Validators.maxLength(10)]),
    'datepay': new FormControl<any>('', [Validators.required]),
    'method': new FormControl<any>('', [Validators.required]),
    'nroref': new FormControl<any>('',),
    'amount': new FormControl<any>('', [Validators.required, Validators.minLength(0)]),
  })

  ngOnInit(): void {
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
        let body = {
          depot: 'true',
          manual: 'true',
          store: this.services.user.store,
          "invoice_number": valor.nrofactura,
          "date_payment": valor.datepay,
          "method_payment": valor.method,
        }
        this.value1.emit(body)
        this.services.paso1.next(body)
      }
    })
  }
}
