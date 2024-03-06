import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuppliesComponent } from './supplies.component';
import { NewProductComponent } from './components/new-product/new-product.component';
import { ProductsAllComponent } from './components/products-all/products-all.component';

const routes: Routes = [
  {
    path: '',
    component: SuppliesComponent,
  },
  {
    path: 'new_products',
    component: NewProductComponent
  },
  {
    path: 'products',
    component: ProductsAllComponent
  },
  {
    path: 'products/:id',
    component: NewProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliesRoutingModule { }
