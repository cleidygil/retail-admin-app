import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from '../category/category.component';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { MyBranchComponent } from './my-branch.component';
import { BrandsComponent } from '../brands/brands.component';
import { NewBrandsComponent } from '../new-brands/new-brands.component';

const routes: Routes = [
  {
    path: '',
    component: MyBranchComponent
  },
  {
    path: ':store/categories',
    component: CategoryComponent
  },
  {
    path: ':store/categories/:id',
    component: NewCategoryComponent
  },
  {
    path: ':store/new_category',
    component: NewCategoryComponent,
  },
  {
    path: ':store/new_brand',
    component: NewBrandsComponent,
  },
  {
    path: ':store/brands',
    component: BrandsComponent
  },
  {
    path: ':store/brands/:id',
    component: NewBrandsComponent
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyBranchRoutingModule { }
