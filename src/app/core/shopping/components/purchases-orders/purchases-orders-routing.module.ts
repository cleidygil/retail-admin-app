import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchasesOrdersComponent } from './purchases-orders.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { NewOrdersComponent } from './components/new-orders/new-orders.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';

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
    path:'suppliers', 
    component: SuppliersComponent
  },
  {
    path:'new_orders/:id', 
    component: NewOrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchasesOrdersRoutingModule { }
