import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { AllStore, MyStoreParams } from 'src/app/core/store/interfaces/store';
import { StoreService } from 'src/app/core/store/services/store.service';
import { PurchasesOrder, Shopping } from '../../interface/shopping';
import { ShoppingService } from '../../services/shopping.service';
import { DetailOrdersHistoryComponent } from './detail-orders-history/detail-orders-history.component';
import { GlobalService } from 'src/app/global/services/global.service';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.css']
})
export class OrdersHistoryComponent {
  private storeServices = inject(StoreService)
  private services = inject(ShoppingService)
  private dialog = inject(MatDialog)
  private global = inject(GlobalService)

  mystores: AllStore[] = []
  mybranch: AllStore[] = []
  params = new FormGroup({
    search: new FormControl(''),
    store: new FormControl(''),
    type: new FormControl(''),
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date  | null>(null),
  })
  nextPage: number = 1;
  count: number = 1
  ordersList: PurchasesOrder[] = []
  ngOnInit(): void {
    this.getAllStore()
    this.getAllBranch()
    this.getPurchasesOrders()
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


  getPurchasesOrders() {
    const valor = this.params.value
    const params: Shopping = new Shopping()
    params.page= this.nextPage
    params.store = valor.store || '',
      params.type = valor.type || '';
    params.search = valor.search || ''
    params.status= '4'
    params.depot ='false'
    if (valor.start != null && valor.end != null) {
      params.created_at_since = new Date(valor?.start).toLocaleDateString("fr-CA",);
      params.created_at_until = new Date(valor?.end).toLocaleDateString("fr-CA",)
    }
    this.services.getPurchasesOrders(params).then((result) => {
      this.ordersList = result.results
      this.count = result.count
    }).catch((error) => {
      console.log(error)
    })
  }
  nextPageIndex(event: PageEvent) {
    this.nextPage = event.pageIndex + 1;
    this.getPurchasesOrders()
  }
  openChangeStatus(item: any) {
    const dialogo = this.dialog.open(DetailOrdersHistoryComponent, {
      data: item,
      width: window.innerWidth > 430 ? '40%' : 'auto'
    })
    dialogo.afterClosed().subscribe(data => {
      if (data) {
        this.getPurchasesOrders()
      }
    })
  }
}
