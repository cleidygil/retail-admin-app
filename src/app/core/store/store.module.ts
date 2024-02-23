import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandsComponent } from './brands/brands.component';
import { StoreRoutingModule } from './store-routing.module';
import { MaterialDesignModule } from 'src/app/components-iu/material-design.module';
import { BoxesComponent } from './boxes/boxes.component';
import { MeasurementUnitComponent } from './measurement-unit/measurement-unit.component';
import { DsitributiontsMediumComponent } from './dsitributionts-medium/dsitributionts-medium.component';
import { PaymentsMethodsComponent } from './payments-methods/payments-methods.component';
import { MyStoreComponent } from './my-store/my-store.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { DialogBrandsComponent } from './brands/dialog-brands/dialog-brands.component';
import { HomeModule } from '../home/home.module';



@NgModule({
  declarations: [
    BrandsComponent,
    BoxesComponent,
    MeasurementUnitComponent,
    DsitributiontsMediumComponent,
    PaymentsMethodsComponent,
    MyStoreComponent,
    SuppliersComponent,
    DialogBrandsComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    MaterialDesignModule,
    HomeModule
  ]
})
export class StoreModule { }
