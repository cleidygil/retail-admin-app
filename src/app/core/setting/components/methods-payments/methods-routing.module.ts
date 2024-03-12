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
    path: ':store/method_store',
    component: MethodsStoreComponent
  },
  {
    path: ':store/new_method',
    component: NewMethodPaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MethodsRoutingModule { }
