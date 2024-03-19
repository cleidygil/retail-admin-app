import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { LoadingService } from 'src/app/global/services/loading.service';

@Component({
  selector: 'app-products-all',
  templateUrl: './products-all.component.html',
  styleUrls: ['./products-all.component.css']
})
export class ProductsAllComponent {
  [x: string]: any;
  private formBuilder = inject(FormBuilder)
  private loading = inject(LoadingService)
  @Input() productsAll: any = []
  @Output() valueForm = new EventEmitter()
  nextPage: number = 1;
  pageIndex: number = 10
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
        quantity: 0 || item.quantity,
        product: item.id,
        name: item.name,
        brand_name: item.brand_name,
        mu_name: item.mu_name
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
