import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageComponent } from './manage.component';
import { NewBrandsComponent } from './components/new-brands/new-brands.component';
import { BrandsComponent } from './components/brands/brands.component';
import { MeasurementunitsComponent } from './components/measurementunits/measurementunits.component';
import { NewMeasurementunitsComponent } from './components/new-measurementunits/new-measurementunits.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { NewSuppliersComponent } from './components/new-suppliers/new-suppliers.component';

const routes: Routes = [
  {
    path: '',
    component: ManageComponent
  },
  {
    path: 'new_brand',
    component: NewBrandsComponent,
  },
  {
    path: 'brands',
    component: BrandsComponent
  },
  {
    path: 'brands/:id',
    component: NewBrandsComponent
  },
  {
    path: 'measurement_units',
    component: MeasurementunitsComponent
  },
  {
    path: 'measurement_units/:id',
    component: NewMeasurementunitsComponent
  },
  {
    path: 'new_measurement_units',
    component: NewMeasurementunitsComponent,
  }
  ,
  {
    path: 'suppliers',
    component: SuppliersComponent
  },
  {
    path: 'suppliers/:id',
    component: NewSuppliersComponent
  },
  {
    path: 'new_suppliers',
    component: NewSuppliersComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
