import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-products-detail-orders-history',
  templateUrl: './products-detail-orders-history.component.html',
  styleUrls: ['./products-detail-orders-history.component.css']
})
export class ProductsDetailOrdersHistoryComponent {

  @Input() product: any
  @Input() typeOrder!: number
  @Input() i: any

  asignarValor(event: Event) {
    const target = event.target as HTMLInputElement
    this.product.patchValue({ quantity: Number(target.value) });
  }
}
