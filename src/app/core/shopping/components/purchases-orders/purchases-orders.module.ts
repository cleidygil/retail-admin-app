import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchasesOrdersRoutingModule } from './purchases-orders-routing.module';
import { PurchasesOrdersComponent } from './purchases-orders.component';
import { HomeModule } from 'src/app/core/home/home.module';
import { MaterialDesignModule } from 'src/app/components-iu/material-design.module';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { NewOrdersComponent } from './components/new-orders/new-orders.component';


@NgModule({
  declarations: [PurchasesOrdersComponent, OrdersListComponent, NewOrdersComponent],
  imports: [
    CommonModule,
    PurchasesOrdersRoutingModule,
    HomeModule,
    MaterialDesignModule
  ]
})
export class PurchasesOrdersModule { }
