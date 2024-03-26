import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductionOrderRoutingModule } from './production-order-routing.module';
import { NewProductionOrderComponent } from './components/new-production-order/new-production-order.component';
import { ProductionQueueComponent } from './components/production-queue/production-queue.component';
import { ProductionOrderComponent } from './production-order.component';
import { MaterialDesignModule } from 'src/app/components-iu/material-design.module';


@NgModule({
  declarations: [ProductionOrderComponent,
    NewProductionOrderComponent,
    ProductionQueueComponent
  ],
  imports: [
    CommonModule,
    ProductionOrderRoutingModule,
    MaterialDesignModule
  ]
})
export class ProductionOrderModule { }
