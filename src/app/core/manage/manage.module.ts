import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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


@NgModule({
  declarations: [ManageComponent, BrandsComponent, NewBrandsComponent, MeasurementunitsComponent, NewMeasurementunitsComponent, NewSuppliersComponent, SuppliersComponent, TaxesComponent, NewTaxesComponent],
  imports: [
    CommonModule,
    ManageRoutingModule,
    MaterialDesignModule
  ]
})
export class ManageModule { }
