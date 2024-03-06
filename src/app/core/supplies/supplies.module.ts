import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuppliesRoutingModule } from './supplies-routing.module';
import { SuppliesComponent } from './supplies.component';
import { MaterialDesignModule } from 'src/app/components-iu/material-design.module';
import { NewProductComponent } from './components/new-product/new-product.component';
import { ProductsAllComponent } from './components/products-all/products-all.component';
import { ProductSaleComponent } from './components/new-product/product-sale/product-sale.component';


@NgModule({
  declarations: [SuppliesComponent, NewProductComponent, ProductsAllComponent, ProductSaleComponent],
  imports: [
    CommonModule,
    SuppliesRoutingModule,
    MaterialDesignModule
  ]
})
export class SuppliesModule { }
