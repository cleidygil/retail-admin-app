import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderItem, Shopping } from 'src/app/core/shopping/interface/shopping';
import { ShoppingService } from 'src/app/core/shopping/services/shopping.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';

@Component({
  selector: 'app-purchase-price-record',
  templateUrl: './purchase-price-record.component.html',
  styleUrls: ['./purchase-price-record.component.css']
})
export class PurchasePriceRecordComponent {
  private services = inject(ShoppingService)
  private snack = inject(SnackbarService)
  private activateRou = inject(ActivatedRoute);
  private router = inject(Router)
  private formBuilder = inject(FormBuilder)

  counters!: FormGroup;
  sub!: Subscription
  id: number | null = null
  allProdutcts: OrderItem[] = []
  nextPageProd: number = 1;
  pageIndexProd: number = 10
  countProd: number = 0
  delete: number | any
  totalPrice: number = 0
  supplierform = new FormGroup({
    'supplier': new FormControl<any>({ value: '', readonly: true }, [Validators.required]),
    'created_at': new FormControl<any>({ value: '', readonly: true }, [Validators.required]),
    'phone': new FormControl<any>({ value: '', readonly: true }),
    'price': new FormControl<any>({ value: this.totalPrice, readonly: true }, [Validators.required]),
    'store': new FormControl<any>({ value: '', readonly: true }, [Validators.required]),
  })
  constructor() {
    this.sub = this.activateRou.params.subscribe((data) => {
      this.id = Number(data['id']) || null
    })
  }
  ngOnInit(): void {
    if (this.id != null) {
      this.getOrderID()
    }
    this.counters = this.formBuilder.group({
      inputs: this.formBuilder.array([])
    });
    this.getOrderItems()
    this.inputs?.valueChanges.subscribe(data => {
      // console.log(data)
      this.supplierform.patchValue({
        price: this.inputs.value.reduce((acumulador: any, objeto: any) => acumulador + objeto.cost, 0)
      })
      // this.delete ?? this.deleteProduct(this.delete)
    })

  }
  form = new FormGroup({
    search: new FormControl(''),
  })
  getOrderID() {
    this.supplierform.disable()
    this.services.getPurchasesOrdersID(Number(this.id)).then((result) => {
      let date = new Date(result.created_at)
      this.supplierform.patchValue({
        created_at: date,
        supplier: result?.supplier_name,
        store: result.store_name,
        phone: '',
        price: 0
      })
    }).catch((error) => {
      this.snack.openSnackBar("Ocurrio un error! Por favor vuelva a intentarlo")
    })
  }
  get inputs() {
    return (this.counters.controls["inputs"] as FormArray);
  }
  agregarControles() {
    this.allProdutcts.map((item: any) => {
      const lessonForm = this.formBuilder.group({
        purchase_order: this.id,
        product_name: item.product_name,
        proudct_mu_name: item.proudct_mu_name,
        proudct_brand_name: item.proudct_brand_name,
        product: item.product,
        cost: item.cost || 0,
        quantity: item.quantity,
      });
      this.inputs.push(lessonForm)
    });
  }


  getOrderItems() {
    this.inputs.controls = []
    const params: Shopping = new Shopping()
    const valor = this.form.value
    params.purchase_order = this.id?.toString()
    params.page = this.nextPageProd
    params.search = valor.search || ''
    this.services.getPurchasesOrdersItems(params).then((result) => {
      this.allProdutcts = result.results
      this.countProd = result.count
      this.agregarControles();
    })
  }
  nextPageIndexProducts(event: PageEvent) {
    this.nextPageProd = event.pageIndex + 1;
    this.getOrderItems()
  }
  onSubmit() {
    let body = {
      order: this.id,
      items: this.inputs.value,
    }
    this.services.registerPurchasePrice.next(body)
    this.router.navigate(['/home/shopping/purchases_orders/payments', this.id])
  }
  deleteProduct(id: number) {

    // this.allProdutcts = this.allProdutcts.filter(item => item.product != id).map(item => item)
    this.inputs.removeAt(id)
  }
}
