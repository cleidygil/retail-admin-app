import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { DetailOrderComponent } from 'src/app/core/shopping/components/purchases-orders/components/detail-order/detail-order.component';
import { StatusOrder, OrderItem, PurchasesOrder, Shopping } from 'src/app/core/shopping/interface/shopping';
import { ShoppingService } from 'src/app/core/shopping/services/shopping.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';

@Component({
  selector: 'app-dialog-change-invoices-orders',
  templateUrl: './dialog-change-invoices-orders.component.html',
  styleUrls: ['./dialog-change-invoices-orders.component.css']
})
export class DialogChangeInvoicesOrdersComponent {
  private services = inject(ShoppingService);
  private snack = inject(SnackbarService)
  private router = inject(Router)
  private formBuilder = inject(FormBuilder)

  counters!: FormGroup;
  nextPageProd: number = 1;
  pageIndexProd: number = 10
  countProd: number = 0
  statusOrder: StatusOrder[] = []
  typeOrder!: number
  ordersId: any
  form = new FormGroup({
    search: new FormControl(''),
    depot: new FormControl('', [Validators.required]),
  })

  // valueForm: any[] = []
  orderItems: OrderItem[] = []
  constructor(
    public dialogRef: MatDialogRef<DetailOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PurchasesOrder,
  ) { }

  ngOnInit(): void {
    this.counters = this.formBuilder.group({
      inputs: this.formBuilder.array([])
    });
    this.form.patchValue({
      depot: this.data.depot.toString()
    })
    console.log(this.data)
    console.log("this.data")

    this.ordersId = this.data.id
    this.getOrderItems()
  }


  get inputs() {
    return (this.counters.controls["inputs"] as FormArray);
  }
  getOrderItems() {
    this.inputs.controls = []
    const params: Shopping = new Shopping()
    const valor = this.form.value
    params.purchase_order = this.data.id.toString()
    params.page = this.nextPageProd
    params.search = valor.search || ''
    this.services.getPurchasesOrdersItems(params).then((result) => {
      this.orderItems = result.results
      this.countProd = result.count
      this.agregarControles();
    })
  }
  agregarControles() {
    this.orderItems.map((item: any) => {
      const lessonForm = this.formBuilder.group<any>({
        purchase_order: this.ordersId,
        product_name: item.product_name,
        proudct_mu_name: item.proudct_mu_name,
        proudct_brand_name: item.proudct_brand_name,
        product: item.product,
        cost: item.cost,
        quantity: item.quantity,
        id: item.id
      });
      this.inputs.push(lessonForm)
    });
  }
  nextPageIndexProducts(event: PageEvent) {
    this.nextPageProd = event.pageIndex + 1;
    this.getOrderItems()
  }
  onSubmit() {
    if(!this.data.depot){
      let valor = this.form.value
      let body = {
        depot: valor.depot,
      }
    
      this.services.patchPurchasesOrders(body, this.data.id).then((result) => {
        this.dialogRef.close(true)
        this.snack.openSnackBar("Orden actualizada exitosamente")
      }).catch((error) => {
        this.snack.openSnackBar("Ocurrio un error, intente de nuevo!")
      })
    }else{
      this.dialogRef.close(false)
    }

    return
  }
}
