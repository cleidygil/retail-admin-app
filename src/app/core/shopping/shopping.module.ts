import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingComponent } from './shopping.component';
import { ShoppingRoutingModule } from './shopping-routing.module';
import { MaterialDesignModule } from 'src/app/components-iu/material-design.module';
import { OrdersHistoryComponent } from './components/orders-history/orders-history.component';
import { DetailOrdersHistoryComponent } from './components/orders-history/detail-orders-history/detail-orders-history.component';



@NgModule({
  declarations: [ShoppingComponent],
  imports: [
    CommonModule,
    ShoppingRoutingModule,
    MaterialDesignModule
  ]
})
export class ShoppingModule { }
