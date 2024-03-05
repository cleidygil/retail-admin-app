import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuppliesRoutingModule } from './supplies-routing.module';
import { SuppliesComponent } from './supplies.component';
import { MaterialDesignModule } from 'src/app/components-iu/material-design.module';


@NgModule({
  declarations: [SuppliesComponent],
  imports: [
    CommonModule,
    SuppliesRoutingModule,
    MaterialDesignModule
  ]
})
export class SuppliesModule { }
