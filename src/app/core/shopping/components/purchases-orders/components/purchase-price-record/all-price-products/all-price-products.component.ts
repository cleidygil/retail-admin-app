import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-all-price-products',
  templateUrl: './all-price-products.component.html',
  styleUrls: ['./all-price-products.component.css']
})
export class AllPriceProductsComponent {
  @Input() product: any
  @Input() i: any
  @Output() delete = new EventEmitter()

  asignarValor(event: Event) {
    const target = event.target as HTMLInputElement
    this.product.patchValue({ cost: Number(target.value) });
    
  }
  deleteProduct(id:number){
    this.delete.emit(id)
    // this.product.removeAt(id)
  }
}
