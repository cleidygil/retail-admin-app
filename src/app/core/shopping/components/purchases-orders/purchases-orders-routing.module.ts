import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchasesOrdersComponent } from './purchases-orders.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { NewOrdersComponent } from './components/new-orders/new-orders.component';

const routes: Routes = [
  {
    path:'',
    component: PurchasesOrdersComponent
  },
  {
    path:'orders',
    component: OrdersListComponent
  },
  {
    path:'new_orders',
    component: NewOrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchasesOrdersRoutingModule { }
