import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';
import { MaterialDesignModule } from 'src/app/components-iu/material-design.module';


@NgModule({
  declarations: [
    SettingComponent,
  
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    MaterialDesignModule
  ]
})
export class SettingModule { }
