import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductionOrderComponent } from './production-order.component';
import { NewProductionOrderComponent } from './components/new-production-order/new-production-order.component';
import { ProductionQueueComponent } from './components/production-queue/production-queue.component';

const routes: Routes = [
  {
    path: '',
    component: ProductionOrderComponent
  },
  {
    path: 'new_production_order',
    component: NewProductionOrderComponent
  }, {
    path: 'production_tail',
    component: ProductionQueueComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductionOrderRoutingModule { }
