import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderItem, PurchasesOrder, Shopping } from 'src/app/core/shopping/interface/shopping';
import { ShoppingService } from 'src/app/core/shopping/services/shopping.service';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.css']
})
export class DetailOrderComponent {
  private services = inject(ShoppingService);

  statusOrder!: PurchasesOrder
  ordersId: any
  form = new FormGroup({
    search: new FormControl(''),
    status: new FormControl('')
  })
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
    params.purchase_order = this.data.id.toString()
    this.services.getPurchasesOrdersItems(params).then((result) => {
      this.orderItems = result.results
    })
  }
}
