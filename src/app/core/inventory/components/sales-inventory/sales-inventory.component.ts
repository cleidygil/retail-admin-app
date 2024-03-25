import { Component, inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { AllStore, MyStoreParams } from 'src/app/core/store/interfaces/store';
import { StoreService } from 'src/app/core/store/services/store.service';
import { GlobalService } from 'src/app/global/services/global.service';
import { InventoryRes, Inventory } from '../../interfaces/inventory';
import { InventoryService } from '../../services/inventory.service';
import { TransferProductComponent } from '../transfer-product/transfer-product.component';
import { DialogAlertProductsComponent } from '../dialog-alert-products/dialog-alert-products.component';
import { WarehouseReturnComponent } from '../warehouse-return/warehouse-return.component';

@Component({
  selector: 'app-sales-inventory',
  templateUrl: './sales-inventory.component.html',
  styleUrls: ['./sales-inventory.component.css']
})
export class SalesInventoryComponent {
  private storeServices = inject(StoreService)
  private dialog = inject(MatDialog)
  private global = inject(GlobalService)
  private services = inject(InventoryService)
  mystores: AllStore[] = []
  mybranch: AllStore[] = []
  params = new FormGroup({
    search: new FormControl(''),
    store: new FormControl(''),
    type: new FormControl(''),
    start: new FormControl<Date>(new Date()),
    end: new FormControl<Date>(new Date()),
  })
  nextPage: number = 1;
  count: number = 1
  productsAll: InventoryRes[] = []
  nameStore: string = ''
  ngOnInit(): void {
    this.getAllStore()
    this.getAllBranch()
    this.getAllProducts()
    this.params.valueChanges.subscribe(data => {
      if (data.store != '') {
        let name = this.mybranch.filter((item) => item.id == Number(this.params.value?.store)).map(item => item.name)
        this.nameStore = name[0]
      }
    })
  }

  getAllStore() {
    const params = new MyStoreParams()
    params.parent = 'false'
    this.storeServices.getUserStores(params).then((result) => {
      this.mystores = result
    }).catch((err) => {
      console.log(err)
    });
  }
  getAllBranch() {
    const params = new MyStoreParams()
    params.parent = 'true'
    this.storeServices.getUserStores(params).then((result) => {
      this.mybranch = result
    }).catch((err) => {
      console.log(err)
    });
  }


  getAllProducts() {
    const params: Inventory = new Inventory()
    params.type = '1';
    params.page = this.nextPage;
    params.search = this.params.value?.search || '';
    params.store =   this.params.value?.store || '';
    this.services.getAllInventory(params).then((result) => {
      // this.loading.hideLoading()
      this.productsAll = result.results
      this.count = result.count
    }).catch((err) => {
      console.log(err)
      // this.loading.hideLoading()
    });
  }
  nextPageIndex(event: PageEvent) {
    this.nextPage = event.pageIndex + 1;
    this.getAllProducts()
  }
  openChangeStatus(item: any) {
    const dialogo = this.dialog.open(WarehouseReturnComponent, {
      data: {item, type:1},
      width: window.innerWidth > 430 ? '40%' : 'auto'
    })
    dialogo.afterClosed().subscribe(data => {
      if (data) {
        this.getAllProducts()
      }
    })
  }
  openAlert() {
    const dialogo = this.dialog.open(DialogAlertProductsComponent, {
      width: window.innerWidth > 430 ? 'auto' : 'auto'
    })
    dialogo.afterClosed().subscribe(data => {
      if (data) {
        this.getAllProducts()
      }
    })
  }
}
