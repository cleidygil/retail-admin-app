import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { LoadingService } from 'src/app/global/services/loading.service';

@Component({
  selector: 'app-products-detail-order',
  templateUrl: './products-detail-order.component.html',
  styleUrls: ['./products-detail-order.component.css']
})
export class ProductsDetailOrderComponent {
  @Input() product: any
  @Input() typeOrder!: number
  @Input() i: any

  asignarValor(event: Event) {
    const target = event.target as HTMLInputElement
    this.product.patchValue({ quantity: Number(target.value) });
  }
  }
