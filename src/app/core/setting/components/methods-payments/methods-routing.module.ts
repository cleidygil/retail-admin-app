import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MethodsPaymentsComponent } from './methods-payments.component';
import { MethodsStoreComponent } from './methods-store/methods-store.component';
import { NewMethodPaymentComponent } from './new-method-payment/new-method-payment.component';

const routes: Routes = [
  {
    path: '',
    component: MethodsPaymentsComponent
  },
  {
    path: 'method_store/:id',
    component: MethodsStoreComponent
  },
  {
    path: 'new_method/:id',
    component: NewMethodPaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MethodsRoutingModule { }
