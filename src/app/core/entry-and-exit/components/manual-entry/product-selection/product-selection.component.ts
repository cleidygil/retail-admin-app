import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { BrandsParams } from 'src/app/core/manage/interface/manege.interface';
import { ManageService } from 'src/app/core/manage/services/manege.service';
import { DialogNewProductComponent } from 'src/app/core/shopping/components/purchases-orders/components/dialog-selected-products/dialog-new-product/dialog-new-product.component';
import { MyStoreParams } from 'src/app/core/store/interfaces/store';
import { SuppliesService } from 'src/app/core/supplies/services/supplies.service';
import { LoadingService } from 'src/app/global/services/loading.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';
import { EntryAndExitService } from '../../../services/entry-and-exit.service';
import { DialogLoadProductComponent } from '../dialog-load-product/dialog-load-product.component';
import { DepotService } from 'src/app/core/depot/services/depot.service';
import { ShoppingService } from 'src/app/core/shopping/services/shopping.service';

@Component({
  selector: 'app-product-selection',
  templateUrl: './product-selection.component.html',
  styleUrls: ['./product-selection.component.css']
})
export class ProductSelectionComponent {
  private services = inject(SuppliesService)
  private brandServices = inject(ManageService)
  private entryexitservices = inject(EntryAndExitService)
  private shopServices = inject(ShoppingService)
  private snack = inject(SnackbarService)
  private loading = inject(LoadingService)
  private dialog = inject(MatDialog)
  @Output() value2 = new EventEmitter<any>()
  productsAll: any = []
  allProdutcts: any[] = []
  delete: number | any
  brands: any = []
  nextPage: number = 1;
  nextPageProd: number = 1;
  pageIndex: number = 10
  count: number = 0
  countProd: number = 0
  id: number | null = null
  params = new FormGroup({
    search: new FormControl(''),
  })
  items: any[] = []
  brandsSelect = new FormGroup({
    brand: new FormControl(''),
  })
  ngOnInit(): void {
    this.getBrands()
    this.getAllProducts()
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
  getAllProducts() {
    this.loading.showLoading()
    const params = new MyStoreParams()
    params.brands = this.brandsSelect.value?.brand || '';
    params.page = this.nextPageProd;
    params.search = this.params.value?.search || '';
    this.services.getAllProducts(params).then((result) => {
      this.loading.hideLoading()
      this.productsAll = result.results
      this.countProd = result.count
    }).catch((err) => {
      console.log(err)
      this.loading.hideLoading()
    });
  }
  nextPageIndexProducts(event: PageEvent) {
    this.nextPageProd = event.pageIndex + 1;
    this.getAllProducts()
  }
  addProduct() {
    const dialogo = this.dialog.open(DialogNewProductComponent, {
      data: '',
      width: window.innerWidth > 659 ? 'auto' : 'auto',
    })
    dialogo.afterClosed().subscribe(data => {
      if (data) {
        this.getAllProducts()
      }
    })
  }
  loadProduct(item: any) {
    const dialogo = this.dialog.open(DialogLoadProductComponent, {
      data: item,
      width: window.innerWidth > 659 ? 'auto' : 'auto',
    })
    dialogo.afterClosed().subscribe(data => {
      if (data) {
        let newDate: any[] = this.entryexitservices.array.value
        let copias = [...this.allProdutcts, ...newDate]
        let prueba = copias.reduce((acc: any[], obj: any) => {
          let duplicado = acc.filter((it) => it.product === obj.product)
          if (duplicado.length > 0) {
            duplicado[0].quantity = obj.quantity
          } else {
            acc.push(obj);
          }
          return acc;
        }, []);
        this.allProdutcts = prueba.length > 0 ? prueba : this.allProdutcts
        const value: any[] = []
        this.allProdutcts.map((valor) => {
          value.push({
            cost: valor.cost,
            quantity: valor.quantity,
            product: valor.product,
            purchase_order: null,
          });
        })
        this.value2.emit(value)
      }
    })
  }
  

   deleteProduct(id: number) {
    this.allProdutcts = this.allProdutcts.filter(item => item.product != id).map(item => item)
  }
 
}
