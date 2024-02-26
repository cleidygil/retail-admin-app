import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrandsComponent } from './brands/brands.component';
import { BoxesComponent } from './boxes/boxes.component';
import { MeasurementUnitComponent } from './measurement-unit/measurement-unit.component';
import { DsitributiontsMediumComponent } from './dsitributionts-medium/dsitributionts-medium.component';
import { MyStoreComponent } from './my-store/my-store.component';

const routes: Routes = [

  {
    path: '',
    children: [
      {
        path :'',
        redirectTo:'store',
        pathMatch:'full'
      },
      {
        path: 'store',
        loadChildren: () => import('./my-store/my-store.module').then(m => m.MyStoreModule)
      },
      {
        path: 'brands',
        component: BrandsComponent
      },
      {
        path: 'boxes',
        component: BoxesComponent
      },
      {
        path: 'measurement_units',
        component: MeasurementUnitComponent
      },
      {
        path: 'distributions_unit',
        component: DsitributiontsMediumComponent
      },
      {
        path: 'suppliers',
        component: BoxesComponent
      },]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
