import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchasesOrdersRoutingModule } from './purchases-orders-routing.module';
import { PurchasesOrdersComponent } from './purchases-orders.component';
import { HomeModule } from 'src/app/core/home/home.module';
import { MaterialDesignModule } from 'src/app/components-iu/material-design.module';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { NewOrdersComponent } from './components/new-orders/new-orders.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { DialogSelectedProductsComponent } from './components/dialog-selected-products/dialog-selected-products.component';
import { ProductsAllComponent } from './components/dialog-selected-products/products-all/products-all.component';
import { DetailOrderComponent } from './components/detail-order/detail-order.component';
import { ProductsDetailOrderComponent } from './components/detail-order/products-detail-order/products-detail-order.component';
import { PurchasePriceRecordComponent } from './components/purchase-price-record/purchase-price-record.component';
import { AllPriceProductsComponent } from './components/purchase-price-record/all-price-products/all-price-products.component';
import { PaymentsPurchasePriceComponent } from './components/payments-purchase-price/payments-purchase-price.component';


@NgModule({
  declarations: [PurchasesOrdersComponent, OrdersListComponent, NewOrdersComponent, SuppliersComponent, DialogSelectedProductsComponent, ProductsAllComponent, DetailOrderComponent, ProductsDetailOrderComponent, PurchasePriceRecordComponent, AllPriceProductsComponent, PaymentsPurchasePriceComponent],
  imports: [
    CommonModule,
    PurchasesOrdersRoutingModule,
    HomeModule,
    MaterialDesignModule
  ]
})
export class PurchasesOrdersModule { }
