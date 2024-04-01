import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { BrandsParams } from 'src/app/core/manage/interface/manege.interface';
import { ManageService } from 'src/app/core/manage/services/manege.service';
import { DialogNewProductComponent } from 'src/app/core/shopping/components/purchases-orders/components/dialog-selected-products/dialog-new-product/dialog-new-product.component';
import { MyStoreParams } from 'src/app/core/store/interfaces/store';
import { SuppliesService } from 'src/app/core/supplies/services/supplies.service';
import { LoadingService } from 'src/app/global/services/loading.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';

@Component({
  selector: 'app-product-selection',
  templateUrl: './product-selection.component.html',
  styleUrls: ['./product-selection.component.css']
})
export class ProductSelectionComponent {
  private services = inject(SuppliesService)
  private brandServices = inject(ManageService)
  private snack = inject(SnackbarService)
  private loading = inject(LoadingService)
  private formBuilder = inject(FormBuilder)
  private dialog = inject(MatDialog)

  counters!: FormGroup;
  productsAll: any = []
  allProdutcts: any[] = []

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
    brand: new FormControl(''),
  })
  ngOnInit(): void {
   
    this.getBrands()
    this.getAllProducts()
  }
  getAllProducts() {
    this.loading.showLoading()
    const params = new MyStoreParams()
    params.brands = this.brandsSelect.value?.brand || '';
    params.page = this.nextPageProd;
    params.search = this.params.value?.search || '';
    this.services.getAllProducts(params).then((result) => {
      this.loading.hideLoading()
      this.productsAll = result.results
      this.allProdutcts = result.results
      this.countProd = result.count
    }).catch((err) => {
      console.log(err)
      this.loading.hideLoading()
    });
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
  onSubmit() {
    let limpio:any =[] 
    // this.inputs.value.filter((item: any) => Number(item.quantity) > 0).map((item: any) => item)
    this.brandServices.productsArr.next(limpio)
  }
  addProduct() {
    const dialogo = this.dialog.open(DialogNewProductComponent, {
      data: '',
      width: window.innerWidth > 659 ? 'auto' : 'auto',
      // height: '80%'
    })
    dialogo.afterClosed().subscribe(data => {
      if (data) {
        this.getAllProducts()
      }
    })
  }
  deleteProduct(id: number) {
    this.allProdutcts = this.allProdutcts.filter(item => item.product != id).map(item => item)
  }
}
