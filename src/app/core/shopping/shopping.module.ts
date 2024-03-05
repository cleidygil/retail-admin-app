import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingComponent } from './shopping.component';
import { ShoppingRoutingModule } from './shopping-routing.module';
import { MaterialDesignModule } from 'src/app/components-iu/material-design.module';



@NgModule({
  declarations: [ShoppingComponent],
  imports: [
    CommonModule,
    ShoppingRoutingModule,
    MaterialDesignModule
  ]
})
export class ShoppingModule { }
