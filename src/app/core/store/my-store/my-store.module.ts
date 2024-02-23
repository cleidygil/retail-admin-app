import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyStoreRoutingModule } from './my-store-routing.module';
import { StoresAllComponent } from './components/stores-all/stores-all.component';
import { MaterialDesignModule } from 'src/app/components-iu/material-design.module';
import { MyStoreComponent } from './my-store.component';
import { DialogPaymentsMethodsComponent } from './components/dialog-payments-methods/dialog-payments-methods.component';
import { DialogAddStoreComponent } from './components/dialog-add-store/dialog-add-store.component';


@NgModule({
  declarations: [
    StoresAllComponent,
    DialogPaymentsMethodsComponent,
    DialogAddStoreComponent
  ],
  imports: [
    CommonModule,
    MyStoreRoutingModule,
    MaterialDesignModule
  ]
})
export class MyStoreModule { }
