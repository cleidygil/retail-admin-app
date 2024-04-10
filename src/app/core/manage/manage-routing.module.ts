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
import { EnvironmentComponent } from './components/environment/environment.component';
import { ManageEnvironmentsComponent } from './components/manage-environments/manage-environments.component'
import { ManageTablesComponent } from './components/manage-tables/manage-tables.component';
import { CategoryComponent } from './components/category/category.component';
import { NewCategoryComponent } from './components/category/new-category/new-category.component';
import { MyBranchComponent } from './components/my-branch/my-branch.component';
import { NewManageEnvironmentsComponent } from './components/manage-environments/new-manage-environments/new-manage-environments.component';
import { NewManageTablesComponent } from './components/manage-tables/new-manage-tables/new-manage-tables.component';

const routes: Routes = [
  {
    path: '',
    component: ManageComponent
  },
  {
    path: 'branch',
    loadChildren: () => import('./components/my-branch/my-branch.module').then(m => m.MyBranchModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./components/category/category.module').then(m => m.CategoryModule)
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
  {
    path: 'taxes/:id',
    component: NewTaxesComponent,
  },
  {
    path: 'environments',
    component: EnvironmentComponent
  },
  {
    path: 'manage_environments',
    component: ManageEnvironmentsComponent
  },
  {
    path: 'manage_tables',
    component: ManageTablesComponent
  },
  {
    path: 'manage_tables/:id',
    component: NewManageTablesComponent
  },
  {
    path: 'new_ambients',
    component: NewManageEnvironmentsComponent
  },
  {
    path: 'new_tables',
    component: NewManageTablesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
