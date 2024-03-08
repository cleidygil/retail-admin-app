import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingComponent } from './setting.component';
import { MethodsPaymentsComponent } from './components/methods-payments/methods-payments.component';


const routes: Routes = [
  {
    path: '',
    component: SettingComponent
  },
  {
    path: 'methods_payments',
    loadChildren: () => import('./components/methods-payments/methods.module').then(m => m.MethodsModule),

  },
  {
    path: 'distributions_medium',
    loadChildren: () => import('./components/distributions-medium/distributions-medium.module').then(m => m.DistributionsMediumModule),

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
