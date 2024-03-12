import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageComponent } from './manage.component';
import { NewBrandsComponent } from './components/new-brands/new-brands.component';
import { BrandsComponent } from './components/brands/brands.component';
import { MeasurementunitsComponent } from './components/measurementunits/measurementunits.component';
import { NewMeasurementunitsComponent } from './components/new-measurementunits/new-measurementunits.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { NewSuppliersComponent } from './components/new-suppliers/new-suppliers.component';
import { TaxesComponent } from './components/taxes/taxes.component';
import { NewTaxesComponent } from './components/new-taxes/new-taxes.component';
import { CategoryComponent } from './components/category/category.component';
import { NewCategoryComponent } from './components/new-category/new-category.component';
import { MyBranchComponent } from './components/my-branch/my-branch.component';

const routes: Routes = [
  {
    path: '',
    component: ManageComponent
  },
  {
    path: 'branch',
   loadChildren: ()=> import('./components/my-branch/my-branch.module').then(m=> m.MyBranchModule)
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
  },
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
  },
  {
    path: 'taxes',
    component: TaxesComponent
  },
  {
    path: 'new_taxes',
    component: NewTaxesComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
