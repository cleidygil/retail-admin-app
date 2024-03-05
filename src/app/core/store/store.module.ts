import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandsComponent } from './brands/brands.component';
import { StoreRoutingModule } from './store-routing.module';
import { MaterialDesignModule } from 'src/app/components-iu/material-design.module';
import { MyStoreComponent } from './my-store/my-store.component';
import { DialogBrandsComponent } from './brands/dialog-brands/dialog-brands.component';
import { HomeModule } from '../home/home.module';



@NgModule({
  declarations: [
    MyStoreComponent,
    BrandsComponent,
    DialogBrandsComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    MaterialDesignModule,
    HomeModule
  ]
})
export class StoreModule { }
