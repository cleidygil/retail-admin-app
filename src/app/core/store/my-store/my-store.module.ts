import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyStoreRoutingModule } from './my-store-routing.module';
import { StoresAllComponent } from './components/stores-all/stores-all.component';
import { MaterialDesignModule } from 'src/app/components-iu/material-design.module';
import { MyStoreComponent } from './my-store.component';
import { DialogAddStoreComponent } from './components/dialog-add-store/dialog-add-store.component';
import { StoreDetailsComponent } from './components/store-details/store-details.component';

@NgModule({
  declarations: [
    StoresAllComponent,
    DialogAddStoreComponent,
    StoreDetailsComponent,
  ],
  imports: [
    CommonModule,
    MyStoreRoutingModule,
    MaterialDesignModule
  ],
  exports:[]

})
export class MyStoreModule { }
