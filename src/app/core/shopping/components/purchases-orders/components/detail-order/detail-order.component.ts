import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { OrderItem, PurchasesOrder, Shopping, StatusOrder } from 'src/app/core/shopping/interface/shopping';
import { ShoppingService } from 'src/app/core/shopping/services/shopping.service';
import { NotificationDialogComponent } from 'src/app/global/components/notification-dialog/notification-dialog.component';
import { SnackbarService } from 'src/app/global/services/snackbar.service';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.css']
})
export class DetailOrderComponent {
  private services = inject(ShoppingService);
  private snack = inject(SnackbarService)
  private router = inject(Router)
  nextPageProd: number = 1;
  pageIndexProd: number = 10
  countProd: number = 0
  statusOrder: StatusOrder[] = []
  typeOrder!: number
  ordersId: any
  form = new FormGroup({
    search: new FormControl(''),
    status: new FormControl('')
  })
  valueForm: any[] = []
  orderItems: OrderItem[] = []
  constructor(
    public dialogRef: MatDialogRef<DetailOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PurchasesOrder,
  ) { }

  ngOnInit(): void {
    this.ordersId = this.data.id

    this.getStatusOrders()
    this.getOrderItems()
  }

  getStatusOrders() {
    const params: Shopping = new Shopping()
    params.type = '2',
      params.remove_pagination = 'true'
    this.services.getStatusOrder(params).then((res) => {
      this.statusOrder = res
      this.form.patchValue({
        status: this.data.status.toString()
      })
      this.form.valueChanges.subscribe(data => {
        this.typeOrder = Number(data.status)
        this.getOrderItems()
      })
    })
  }
  getOrderItems() {
    const params: Shopping = new Shopping()
    const valor = this.form.value
    params.purchase_order = this.data.id.toString()
    params.page = this.nextPageProd
    params.search = valor.search || ''
    this.services.getPurchasesOrdersItems(params).then((result) => {
      this.orderItems = result.results
      this.countProd = result.count
    })
  }
  nextPageIndexProducts(event: PageEvent) {
    this.nextPageProd = event.pageIndex + 1;
    this.getOrderItems()
  }
  onSubmit() {
    let valor = this.form.value
    let body = {
      status: valor.status,
    }
    if (valor.status == '12') {
      let copias = { items: this.valueForm }
      body = { ...body, ...copias }
    }
    this.services.patchPurchasesOrders(body, this.data.id).then((result) => {
      this.dialogRef.close(true)
      this.snack.openSnackBar("Orden actualizada exitosamente")
      //  this.router.navigate(['./home/shopping/purchases_orders/orders'])
    }).catch((error) => {
      this.snack.openSnackBar("Ocurrio un error, intente de nuevo!")
    })

  }
}
