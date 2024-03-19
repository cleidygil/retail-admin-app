import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { OrderItem, PurchasesOrder, Shopping } from 'src/app/core/shopping/interface/shopping';
import { ShoppingService } from 'src/app/core/shopping/services/shopping.service';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.css']
})
export class DetailOrderComponent {
  private services = inject(ShoppingService);
  nextPageProd: number = 1;
  pageIndexProd: number = 10
  countProd: number = 0
  statusOrder!: PurchasesOrder
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
    this.services.getStatusOrder(2).then((res) => {
      this.statusOrder = res
    })
    
    this.getOrderItems()
  }

  getOrderItems() {
    const params: Shopping = new Shopping()
    const valor=  this.form.value
    params.purchase_order = this.data.id.toString()
    params.page= this.nextPageProd
    params.search =valor.search || ''
    this.services.getPurchasesOrdersItems(params).then((result) => {
      this.orderItems = result.results
      this.countProd = result.count
    })
  }
  nextPageIndexProducts(event: PageEvent) {
    this.nextPageProd = event.pageIndex + 1;
    this.getOrderItems()
  }
  onSubmit(){
    
  }
}
