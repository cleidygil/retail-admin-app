import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { LoadingService } from 'src/app/global/services/loading.service';

@Component({
  selector: 'app-products-all',
  templateUrl: './products-all.component.html',
  styleUrls: ['./products-all.component.css']
})
export class ProductsAllComponent {
  @Input() product: any
  @Input() i: any

  asignarValor(event: Event) {
    const target = event.target as HTMLInputElement
    this.product.patchValue({ quantity: Number(target.value) });
  }
}
