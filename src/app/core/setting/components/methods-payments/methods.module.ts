import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MethodsRoutingModule } from './methods-routing.module';
import { MethodsPaymentsComponent } from './methods-payments.component';
import { MethodsStoreComponent } from './methods-store/methods-store.component';
import { NewMethodPaymentComponent } from './new-method-payment/new-method-payment.component';
import { MaterialDesignModule } from 'src/app/components-iu/material-design.module';
import { SitesModule } from 'src/app/core/sites/sites.module';


@NgModule({
  declarations: [  
    NewMethodPaymentComponent,
    MethodsStoreComponent],
  imports: [
    CommonModule,
    MethodsRoutingModule,
    MaterialDesignModule,
    SitesModule
  ]
})
export class MethodsModule { }
