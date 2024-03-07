import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreRoutingModule } from './store-routing.module';
import { MaterialDesignModule } from 'src/app/components-iu/material-design.module';
import { MyStoreComponent } from './my-store/my-store.component';
import { HomeModule } from '../home/home.module';



@NgModule({
  declarations: [
    MyStoreComponent,
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    MaterialDesignModule,
    HomeModule
  ]
})
export class StoreModule { }
