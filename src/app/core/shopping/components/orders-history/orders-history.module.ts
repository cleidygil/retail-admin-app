import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersHistoryRoutingModule } from './orders-history-routing.module';
import { OrdersHistoryComponent } from './orders-history.component';
import { MaterialDesignModule } from 'src/app/components-iu/material-design.module';
import { ProductsDetailOrdersHistoryComponent } from './detail-orders-history/products-detail-orders-history/products-detail-orders-history.component';
import { HomeModule } from 'src/app/core/home/home.module';
import { DetailOrdersHistoryComponent } from './detail-orders-history/detail-orders-history.component';


@NgModule({
  declarations: [OrdersHistoryComponent, ProductsDetailOrdersHistoryComponent, DetailOrdersHistoryComponent],
  imports: [
    CommonModule,
    OrdersHistoryRoutingModule,
    HomeModule,
    MaterialDesignModule,
  ]
})
export class OrdersHistoryModule { }
