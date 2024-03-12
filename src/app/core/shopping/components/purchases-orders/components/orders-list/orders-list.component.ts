import { Component, inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ManageService } from 'src/app/core/manage/services/manege.service';
import { PurchasesOrder, Shopping } from 'src/app/core/shopping/interface/shopping';
import { ShoppingService } from 'src/app/core/shopping/services/shopping.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent {
  private services = inject(ShoppingService)
  private servicesManage = inject(ManageService)

  nextPage: number = 1;
  count: number = 1
  ordersList: PurchasesOrder[] = []
  ngOnInit(): void {
    this.getPurchasesOrders()
  }

  getPurchasesOrders() {
    const params: Shopping = new Shopping()
    this.services.getPurchasesOrders(params).then((result) => {
      this.ordersList = result.results
    }).catch((error) => {
      console.log(error)
    })
  }
  nextPageIndex(event: PageEvent) {
    this.nextPage = event.pageIndex + 1;
    this.getPurchasesOrders()
  }
}
