import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingComponent } from './shopping.component';


const routes: Routes = [
  {
    path: '',
    component: ShoppingComponent
  },
  {
    path: 'purchases_orders',
    loadChildren: ()=> import('./components/purchases-orders/purchases-orders.module').then(m=> m.PurchasesOrdersModule)
  },
  {
    path: 'orders_history',
    loadChildren: ()=> import('./components/orders-history/orders-history.module').then(m=> m.OrdersHistoryModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule { }
