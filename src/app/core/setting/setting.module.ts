import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';
import { MaterialDesignModule } from 'src/app/components-iu/material-design.module';
import { DistributionsMediumComponent } from './components/distributions-medium/distributions-medium.component';
import { HomeModule } from '../home/home.module';
import { MethodsPaymentsComponent } from './components/methods-payments/methods-payments.component';


@NgModule({
  declarations: [
    SettingComponent,
    DistributionsMediumComponent,
    MethodsPaymentsComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    MaterialDesignModule,
    HomeModule

  ]
})
export class SettingModule { }
