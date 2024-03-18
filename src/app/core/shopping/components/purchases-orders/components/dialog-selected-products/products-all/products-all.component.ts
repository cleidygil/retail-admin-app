import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { LoadingService } from 'src/app/global/services/loading.service';

@Component({
  selector: 'app-products-all',
  templateUrl: './products-all.component.html',
  styleUrls: ['./products-all.component.css']
})
export class ProductsAllComponent {
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
    this.counters.valueChanges.subscribe(data=>{
      this.valueForm.emit(data.inputs)

    })
  }

  getControls() {
    return (this.counters.controls['inputs'] as FormArray).controls;
  }
  agregarControles() {
    this.productsAll.forEach((item: any) => {
      let data = new FormControl<{ id: number, name: string, count: any }>({ id: item.id, name: item.name, count: 0 });  // Inicializa el control con el valor que desees
      (this.counters.controls['inputs'] as FormArray).push(data);
    });
  }
  decrement(index: number, id: number, name: string) {
    let valor: any = (this.counters.controls['inputs'] as FormArray).at(index).value.count
    if (parseInt(valor) > 0) {
    const cant: any = parseInt(valor) - Number(1);
    (this.counters.controls['inputs'] as FormArray).at(index).patchValue({ id, name, count: cant });
    }
  }
  increment(index: number, id: number, name: string) {
    let valor: any = (this.counters.controls['inputs'] as FormArray).at(index).value.count
    const cant: any = parseInt(valor + 1);
    (this.counters.controls['inputs'] as FormArray).at(index).patchValue({ id, name, count: cant });

  }
  confirmar() {
    console.log(this.counters.controls['inputs'].value)
  }
}
