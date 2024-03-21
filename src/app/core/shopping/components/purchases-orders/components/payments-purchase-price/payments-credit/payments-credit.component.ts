import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PurchasesOrder, Shopping } from 'src/app/core/shopping/interface/shopping';
import { ShoppingService } from 'src/app/core/shopping/services/shopping.service';
import { StoreService } from 'src/app/core/store/services/store.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';

@Component({
  selector: 'app-payments-credit',
  templateUrl: './payments-credit.component.html',
  styleUrls: ['./payments-credit.component.css']
})
export class PaymentsCreditComponent {
  @Input() value: any
  private services = inject(ShoppingService)
  private activate = inject(ActivatedRoute)
  private snack = inject(SnackbarService)
  private store = inject(StoreService)
  private router = inject(Router)
  id: number = 0;
  sub!: Subscription
  orderID!: PurchasesOrder
  supplierform = new FormGroup({
    'supplier': new FormControl<any>({ value: '', readonly: true }),
    'store': new FormControl<any>({ value: '', readonly: true }),
    'created_at': new FormControl<any>({ value: '', readonly: true }),
    'nrofactura': new FormControl<any>('', [Validators.required]),
    'datepay': new FormControl<any>('', [Validators.required]),
  })
  methodArr: any[] = []
  constructor() {
    this.sub = this.activate.params.subscribe(data => {
      this.id = Number(data['id'])
    })
  }

  ngOnInit(): void {
    this.getOrderId()
    this.getMethods()
  }
  getOrderId() {
    this.services.getPurchasesOrdersID(this.id).then((result) => {
      this.orderID = result
      this.supplierform.patchValue({
        supplier: result.supplier_name,
        store: result.store_name,
        created_at: new Date(result.created_at),

      })
    }).catch((error) =>
      this.snack.openSnackBar("Ocurrio un error, vuelva a recargar por favor.")
    )
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
    const values = this.services.registerPurchasePrice.value;
    console.log(values, 'values')
    let body = {
      ...this.value,
      invoice_number: data.nrofactura,
      finish_date: data.datepay,
    }
    const arr: any = [];
    values.map((item: any) => {
      arr.push({
        id: item.id,
        quantity: item.quantity,
        cost: item.cost
      })
    })
    
    this.services.patchCostOrdersItems(arr).then((result) => {
      this.services.patchPurchasesOrders(body, this.id).then((result) => {
        this.snack.openSnackBar("Orden actualizada exitosamente")
        this.router.navigate(['./home/shopping/purchases_orders/orders'])
  
      }).catch((error) => {
        this.snack.openSnackBar("Ocurrio un error, intente de nuevo!")
      })
    }).catch((error) => {
      this.snack.openSnackBar("Ocurrio un error, intente de nuevo!")
    })
  }
}
