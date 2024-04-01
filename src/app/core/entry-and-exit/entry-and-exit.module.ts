import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntryAndExitRoutingModule } from './entry-and-exit-routing.module';
import { EntryAndExitComponent } from './entry-and-exit.component';
import { MaterialDesignModule } from 'src/app/components-iu/material-design.module';
import { ComponentsComponent } from './components/components.component';
import { ManualEgressComponent } from './components/manual-egress/manual-egress.component';
import { ManualEntryComponent } from './components/manual-entry/manual-entry.component';
import { PurchaseDataComponent } from './components/manual-entry/purchase-data/purchase-data.component';
import { ProductSelectionComponent } from './components/manual-entry/product-selection/product-selection.component';
import { DialogLoadProductComponent } from './components/manual-entry/dialog-load-product/dialog-load-product.component';
import { DistributeProductComponent } from './components/manual-entry/distribute-product/distribute-product.component';


@NgModule({
  declarations: [EntryAndExitComponent, ComponentsComponent, ManualEgressComponent, ManualEntryComponent, PurchaseDataComponent, ProductSelectionComponent, DialogLoadProductComponent, DistributeProductComponent],
  imports: [
    CommonModule,
    EntryAndExitRoutingModule,
    MaterialDesignModule
  ]
})
export class EntryAndExitModule { }