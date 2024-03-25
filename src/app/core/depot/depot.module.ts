import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepotRoutingModule } from './depot-routing.module';
import { InvoicesOrdersComponent } from './components/invoices-orders/invoices-orders.component';
import { WarehousesComponent } from './components/warehouses/warehouses.component';
import { TransferOfItemsComponent } from './components/transfer-of-items/transfer-of-items.component';
import { DepotComponent } from './depot.component';
import { MaterialDesignModule } from 'src/app/components-iu/material-design.module';
import { DialogChangeInvoicesOrdersComponent } from './components/invoices-orders/dialog-change-invoices-orders/dialog-change-invoices-orders.component';
import { OrdersHistoryModule } from '../shopping/components/orders-history/orders-history.module';
import { DialogProductDistributionComponent } from './components/warehouses/dialog-product-distribution/dialog-product-distribution.component';
import { TransferHistoryComponent } from './components/transfer-history/transfer-history.component';
import { DialogDetailTransferHistoryComponent } from './components/transfer-history/dialog-detail-transfer-history/dialog-detail-transfer-history.component';


@NgModule({
  declarations: [DepotComponent,
    InvoicesOrdersComponent,
    WarehousesComponent,
    TransferOfItemsComponent,
    DialogChangeInvoicesOrdersComponent,
    DialogProductDistributionComponent,
    TransferHistoryComponent,
    DialogDetailTransferHistoryComponent
  ],
  imports: [
    CommonModule,
    DepotRoutingModule,
    MaterialDesignModule,
    OrdersHistoryModule
  ]
})
export class DepotModule { }
