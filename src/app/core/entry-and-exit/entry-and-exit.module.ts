import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntryAndExitRoutingModule } from './entry-and-exit-routing.module';
import { EntryAndExitComponent } from './entry-and-exit.component';
import { MaterialDesignModule } from 'src/app/components-iu/material-design.module';
import { ComponentsComponent } from './components/components.component';
import { ManualEntryComponent } from './components/manual-entry/manual-entry.component';
import { PurchaseDataComponent } from './components/manual-entry/purchase-data/purchase-data.component';
import { ProductSelectionComponent } from './components/manual-entry/product-selection/product-selection.component';
import { DialogLoadProductComponent } from './components/manual-entry/dialog-load-product/dialog-load-product.component';
import { DistributeProductComponent } from './components/manual-entry/distribute-product/distribute-product.component';
import { ProductsListComponent } from './components/manual-entry/product-selection/products-list/products-list.component';
import { PurchasesOrdersModule } from '../shopping/components/purchases-orders/purchases-orders.module';
import { InventoryComponent } from './components/inventory/inventory.component';
import { WarehousesComponent } from './components/warehouses/warehouses.component';
import { OptionInventoryComponent } from './components/option-inventory/option-inventory.component';
import { SalesRawMaterialComponent } from './components/sales-raw-material/sales-raw-material.component';
import { DepotPurcharseOrderComponent } from './components/warehouses/depot-purcharse-order/depot-purcharse-order.component';
import { DepotInventoryComponent } from './components/warehouses/depot-inventory/depot-inventory.component';


@NgModule({
  declarations: [EntryAndExitComponent, ComponentsComponent, ManualEntryComponent, PurchaseDataComponent, ProductSelectionComponent, DialogLoadProductComponent, DistributeProductComponent, ProductsListComponent, WarehousesComponent, InventoryComponent, OptionInventoryComponent, SalesRawMaterialComponent, DepotPurcharseOrderComponent, DepotInventoryComponent],
  imports: [
    MaterialDesignModule,
    CommonModule,
    EntryAndExitRoutingModule,
    PurchasesOrdersModule
  ]
})
export class EntryAndExitModule { }
