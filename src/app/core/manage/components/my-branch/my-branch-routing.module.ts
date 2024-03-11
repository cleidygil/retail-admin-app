import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from '../category/category.component';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { MyBranchComponent } from './my-branch.component';

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
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyBranchRoutingModule { }
