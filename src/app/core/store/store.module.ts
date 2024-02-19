import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandsComponent } from './brands/brands.component';
import { StoreRoutingModule } from './store-routing.module';
import { MaterialDesignModule } from 'src/app/components-iu/material-design.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    MaterialDesignModule
  ]
})
export class StoreModule { }
