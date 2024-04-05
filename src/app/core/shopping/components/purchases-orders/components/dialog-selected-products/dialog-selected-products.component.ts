import { ReturnStatement } from '@angular/compiler';
import { Component, Inject, ViewChild, inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Brand, BrandsParams } from 'src/app/core/manage/interface/manege.interface';
import { ManageService } from 'src/app/core/manage/services/manege.service';
import { MyStoreParams } from 'src/app/core/store/interfaces/store';
import { SuppliesService } from 'src/app/core/supplies/services/supplies.service';
import { LoadingService } from 'src/app/global/services/loading.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';
import { DialogNewProductComponent } from './dialog-new-product/dialog-new-product.component';

@Component({
  selector: 'app-dialog-selected-products',
  templateUrl: './dialog-selected-products.component.html',
  styleUrls: ['./dialog-selected-products.component.css']
})
export class DialogSelectedProductsComponent {
  private services = inject(SuppliesService)
  private brandServices = inject(ManageService)
  private snack = inject(SnackbarService)
  private loading = inject(LoadingService)
  private formBuilder = inject(FormBuilder)
  private dialog = inject(MatDialog)

  counters!: FormGroup;
  productsAll: any = []
  brands: any = []
  nextPage: number = 1;
  nextPageProd: number = 1;
  pageIndex: number = 10
  count: number = 0
  countProd: number = 0
  params = new FormGroup({
    search: new FormControl(''),
  })
  items: any = []
  brandsSelect = new FormGroup({
    brand: new FormControl<any>(''),
  })
  // valueForm: any[] = []


  constructor(
    public dialogRef: MatDialogRef<DialogSelectedProductsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  ngOnInit(): void {
    this.counters = this.formBuilder.group({
      inputs: this.formBuilder.array([])
    });
    this.getBrands()
    this.getAllProducts()
  }
  get inputs() {
    return (this.counters.controls["inputs"] as FormArray);
  }
  getAllProducts() {
    console.log(this.brandsSelect.get('brand')?.value, 'value')
    this.inputs.controls = []
    this.loading.showLoading()
    const params = new MyStoreParams()
    params.brands = this.brandsSelect.value?.brand ;
    params.page = this.nextPageProd;
    params.search = this.params.value?.search || '';
    this.services.getAllProducts(params).then((result) => {
      this.loading.hideLoading()
      this.productsAll = result.results
      this.countProd = result.count
      this.agregarControles();
    }).catch((err) => {
      console.log(err)
      this.loading.hideLoading()
    });
  }
  Validations(e:any){
    e ?? this.getAllProducts
  }

  getBrands() {
    const params = new BrandsParams()
    params.page = this.nextPage
    this.brandServices.getBrands(params).then((result) => {
      this.brands = result.results
      this.count = result.count
      this.pageIndex = Math.ceil(Number(result.count) / 10)
      this.loading.hideLoading()
    }).catch((err) => {
      this.loading.hideLoading()
    });
  }
  nextPageIndex() {
    if (this.nextPage < this.pageIndex) {
      this.nextPage = this.nextPage + 1
      this.getBrands()
      return
    }
  }
  prevPageIndex() {
    if (this.nextPage > 1) {
      this.nextPage = 1
      this.getBrands()
      return
    }
  }
  nextPageIndexProducts(event: PageEvent) {
    this.nextPageProd = event.pageIndex + 1;
    this.getAllProducts()
  }

  agregarControles() {
    this.productsAll.map((item: any) => {
      const lessonForm = this.formBuilder.group<any>({
        quantity: 0 || item.quantity,
        product: item.id,
        name: item.name,
        brand_name: item.brand_name,
        mu_name: item.mu_name
      });
      this.inputs.push(lessonForm)
    });
  }
  onSubmit() {
    let limpio = this.inputs.value.filter((item: any) => Number(item.quantity) > 0).map((item: any) => item)
    this.brandServices.productsArr.next(limpio)
    this.dialogRef.close(true)
  }
  addProduct() {
    const dialogo = this.dialog.open(DialogNewProductComponent, {
      data: '',
      width: window.innerWidth > 432 ? '50%' : 'auto',
      // height: '80%'
    })
    dialogo.afterClosed().subscribe(data => {
      if (data) {
        this.getAllProducts()
      }
    })
  }
}


