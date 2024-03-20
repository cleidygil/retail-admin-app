import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { LoadingService } from 'src/app/global/services/loading.service';

@Component({
  selector: 'app-products-detail-order',
  templateUrl: './products-detail-order.component.html',
  styleUrls: ['./products-detail-order.component.css']
})
export class ProductsDetailOrderComponent {
  [x: string]: any;
  private formBuilder = inject(FormBuilder)
  private loading = inject(LoadingService)
  @Input() productsAll: any = []
  @Input() typeOrder!: number
  @Input() ordersId:any
  @Output() valueForm = new EventEmitter()
  counters!: FormGroup;
  ngOnInit(): void {
       this.counters = this.formBuilder.group({
      inputs: this.formBuilder.array([])
    });
    this.agregarControles();
  }

  get inputs() {
    return (this.counters.controls["inputs"] as FormArray);
  }
  agregarControles() {
    this.productsAll.map((item: any) => {
      const lessonForm = this.formBuilder.group({
        purchase_order: this.ordersId,
        product_name: item.product_name,
        proudct_mu_name: item.proudct_mu_name,
        proudct_brand_name: item.proudct_brand_name,
        product: item.product,
        cost: item.cost,
        quantity:item.quantity,
      });
      this.inputs.push(lessonForm)
    });
  }

  asignarValor(event: Event, index: number, item: any) {
    const target = event.target as HTMLInputElement
    (this.inputs).at(index).patchValue({ quantity: Number(target.value) });
    this.inputs?.valueChanges.subscribe(data => {
      this.valueForm.emit(data)
    })
  }
}
