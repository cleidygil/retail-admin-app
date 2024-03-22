import { Component, inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { PurchasesOrder, Shopping } from 'src/app/core/shopping/interface/shopping';
import { ShoppingService } from 'src/app/core/shopping/services/shopping.service';
import { GlobalService } from 'src/app/global/services/global.service';
import { DialogChangeInvoicesOrdersComponent } from './dialog-change-invoices-orders/dialog-change-invoices-orders.component';

@Component({
  selector: 'app-invoices-orders',
  templateUrl: './invoices-orders.component.html',
  styleUrls: ['./invoices-orders.component.css']
})
export class InvoicesOrdersComponent {
  // private storeServices = inject(StoreService)
  private services = inject(ShoppingService)
  private dialog = inject(MatDialog)
  private global = inject(GlobalService)

  // mystores: AllStore[] = []
  // mybranch: AllStore[] = []
  params = new FormGroup({
    search: new FormControl(''),
   
  })
  nextPage: number = 1;
  count: number = 1
  ordersList: PurchasesOrder[] = []
  ngOnInit(): void {
    // this.getAllStore()
    // this.getAllBranch()
    this.getPurchasesOrders()
  }

  // getAllStore() {
  //   const params = new MyStoreParams()
  //   params.parent = 'false'
  //   this.storeServices.getUserStores(params).then((result) => {
  //     this.mystores = result
  //   }).catch((err) => {
  //     console.log(err)
  //   });
  // }
  // getAllBranch() {
  //   const params = new MyStoreParams()
  //   params.parent = 'true'
  //   this.storeServices.getUserStores(params).then((result) => {
  //     this.mybranch = result
  //   }).catch((err) => {
  //     console.log(err)
  //   });
  // }


  getPurchasesOrders() {
    const valor = this.params.value
    const params: Shopping = new Shopping()
    params.page= this.nextPage
    params.status= '4'
    params.depot ='true'
    
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
    const dialogo = this.dialog.open(DialogChangeInvoicesOrdersComponent, {
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
