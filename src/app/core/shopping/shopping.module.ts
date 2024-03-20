import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingComponent } from './shopping.component';
import { ShoppingRoutingModule } from './shopping-routing.module';
import { MaterialDesignModule } from 'src/app/components-iu/material-design.module';
import { OrdersHistoryComponent } from './components/orders-history/orders-history.component';



@NgModule({
  declarations: [ShoppingComponent, OrdersHistoryComponent],
  imports: [
    CommonModule,
    ShoppingRoutingModule,
    MaterialDesignModule
  ]
})
export class ShoppingModule { }
