import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

import { ManageRoutingModule } from './manage-routing.module';
import { ManageComponent } from './manage.component';
import { MaterialDesignModule } from 'src/app/components-iu/material-design.module';
import { BrandsComponent } from './components/brands/brands.component';
import { NewBrandsComponent } from './components/new-brands/new-brands.component';
import { MeasurementunitsComponent } from './components/measurementunits/measurementunits.component';
import { NewMeasurementunitsComponent } from './components/new-measurementunits/new-measurementunits.component';
import { NewSuppliersComponent } from './components/new-suppliers/new-suppliers.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { TaxesComponent } from './components/taxes/taxes.component';
import { NewTaxesComponent } from './components/new-taxes/new-taxes.component';
import { CategoryComponent } from './components/category/category.component';
import { NewCategoryComponent } from './components/new-category/new-category.component';
import { HomeModule } from '../home/home.module';
import { MyBranchComponent } from './components/my-branch/my-branch.component';
import { ManageEnvironmentsComponent } from './components/manage-environments/manage-environments.component';
import { ManageTablesComponent } from './components/manage-tables/manage-tables.component';
import { BranchEnvironmentComponent } from './components/manage-environments/branch-environment/branch-environment.component';
import { QuantityTablesComponent } from './components/manage-tables/quantity-tables/quantity-tables.component';

registerLocaleData(localeEs, 'es');


@NgModule({
  declarations: [ManageComponent, BrandsComponent, NewBrandsComponent, MeasurementunitsComponent, NewMeasurementunitsComponent, NewSuppliersComponent, SuppliersComponent, TaxesComponent, NewTaxesComponent, CategoryComponent, NewCategoryComponent, ManageEnvironmentsComponent, ManageEnvironmentsComponent, ManageTablesComponent, BranchEnvironmentComponent, QuantityTablesComponent],
  imports: [
    CommonModule,
    ManageRoutingModule,
    MaterialDesignModule,
    HomeModule
  ],
  providers: [ DatePipe, { provide: LOCALE_ID, useValue: 'es' } ]
})
export class ManageModule { }
