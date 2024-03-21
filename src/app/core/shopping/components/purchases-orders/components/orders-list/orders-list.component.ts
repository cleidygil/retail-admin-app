import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ManageService } from 'src/app/core/manage/services/manege.service';
import { PurchasesOrder, Shopping } from 'src/app/core/shopping/interface/shopping';
import { ShoppingService } from 'src/app/core/shopping/services/shopping.service';
import { DetailOrderComponent } from '../detail-order/detail-order.component';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent {
  private services = inject(ShoppingService)
  private servicesManage = inject(ManageService)
  private dialog = inject(MatDialog)
  nextPage: number = 1;
  count: number = 1
  ordersList: PurchasesOrder[] = []
  ngOnInit(): void {
    this.getPurchasesOrders()
  }

  getPurchasesOrders() {
    const params: Shopping = new Shopping()
    params.page= this.nextPage
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
    const dialogo = this.dialog.open(DetailOrderComponent, {
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
