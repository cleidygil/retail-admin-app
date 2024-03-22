import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepotComponent } from './depot.component';
import { WarehousesComponent } from './components/warehouses/warehouses.component';
import { InvoicesOrdersComponent } from './components/invoices-orders/invoices-orders.component';
import { TransferOfItemsComponent } from './components/transfer-of-items/transfer-of-items.component';

const routes: Routes = [
  {
    path: '',
    component: DepotComponent
  },
  {
    path: 'warehouses',
    component: WarehousesComponent
  },
  {
    path: 'invoices_orders',
    component: InvoicesOrdersComponent
  },
  {
    path: 'transfer_items',
    component: TransferOfItemsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepotRoutingModule { }
