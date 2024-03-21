import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersHistoryRoutingModule } from './orders-history-routing.module';
import { OrdersHistoryComponent } from './orders-history.component';
import { MaterialDesignModule } from 'src/app/components-iu/material-design.module';


@NgModule({
  declarations: [OrdersHistoryComponent],
  imports: [
    CommonModule,
    OrdersHistoryRoutingModule,
    MaterialDesignModule
  ]
})
export class OrdersHistoryModule { }
