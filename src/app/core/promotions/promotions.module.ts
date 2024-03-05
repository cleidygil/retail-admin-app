import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromotionsRoutingModule } from './promotions-routing.module';
import { PromotionsComponent } from './promotions.component';
import { MaterialDesignModule } from 'src/app/components-iu/material-design.module';


@NgModule({
  declarations: [PromotionsComponent],
  imports: [
    CommonModule,
    PromotionsRoutingModule,
    MaterialDesignModule
  ]
})
export class PromotionsModule { }
