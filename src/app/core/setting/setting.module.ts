import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';
import { MaterialDesignModule } from 'src/app/components-iu/material-design.module';
import { DistributionsMediumComponent } from './components/distributions-medium/distributions-medium.component';


@NgModule({
  declarations: [
    SettingComponent,
    DistributionsMediumComponent,
  
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    MaterialDesignModule
  ]
})
export class SettingModule { }
