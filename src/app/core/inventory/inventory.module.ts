import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory.component';
import { MaterialDesignModule } from 'src/app/components-iu/material-design.module';
import { RawMaterialComponent } from './components/raw-material/raw-material.component';
import { SalesInventoryComponent } from './components/sales-inventory/sales-inventory.component';
import { TransferProductComponent } from './components/transfer-product/transfer-product.component';
import { DialogAlertProductsComponent } from './components/dialog-alert-products/dialog-alert-products.component';
import { WarehouseReturnComponent } from './components/warehouse-return/warehouse-return.component';


@NgModule({
  declarations: [InventoryComponent, RawMaterialComponent, SalesInventoryComponent, TransferProductComponent, DialogAlertProductsComponent, WarehouseReturnComponent],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    MaterialDesignModule
  ]
})
export class InventoryModule { }
