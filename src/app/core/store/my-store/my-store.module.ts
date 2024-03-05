import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyStoreRoutingModule } from './my-store-routing.module';
import { StoresAllComponent } from './components/stores-all/stores-all.component';
import { MaterialDesignModule } from 'src/app/components-iu/material-design.module';
import { MyStoreComponent } from './my-store.component';
import { DialogPaymentsMethodsComponent } from './components/dialog-payments-methods/dialog-payments-methods.component';
import { DialogAddStoreComponent } from './components/dialog-add-store/dialog-add-store.component';
import { StoreDetailsComponent } from './components/store-details/store-details.component';
import { StorePaymentsMethodsComponent } from './components/store-details/components/store-payments-methods/store-payments-methods.component';
import { MethodsAddBankAccountComponent } from './components/store-details/components/store-payments-methods/methods-add-bank-account/methods-add-bank-account.component';
import { MethodsAddEmailComponent } from './components/store-details/components/store-payments-methods/methods-add-email/methods-add-email.component';


@NgModule({
  declarations: [
    StoresAllComponent,
    DialogPaymentsMethodsComponent,
    DialogAddStoreComponent,
    StoreDetailsComponent,
    StorePaymentsMethodsComponent,
    MethodsAddBankAccountComponent,
    MethodsAddEmailComponent
  ],
  imports: [
    CommonModule,
    MyStoreRoutingModule,
    MaterialDesignModule
  ],
  exports:[
    MethodsAddBankAccountComponent,
    MethodsAddEmailComponent
  ]
})
export class MyStoreModule { }
