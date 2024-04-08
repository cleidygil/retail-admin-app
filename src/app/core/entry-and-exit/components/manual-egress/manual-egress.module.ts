import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManualEgressRoutingModule } from './manual-egress-routing.module';
import { ManualEgressComponent } from './manual-egress.component';
import { WarehousesComponent } from './warehouses/warehouses.component';
import { MaterialDesignModule } from 'src/app/components-iu/material-design.module';
import { DialogProductEgressComponent } from './dialog-product-egress/dialog-product-egress.component';


@NgModule({
  declarations: [ManualEgressComponent, WarehousesComponent, DialogProductEgressComponent],
  imports: [
    CommonModule,
    ManualEgressRoutingModule,
    MaterialDesignModule
  ]
})
export class ManualEgressModule { }
