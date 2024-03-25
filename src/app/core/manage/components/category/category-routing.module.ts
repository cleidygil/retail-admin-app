import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category.component';
import { RecipCategoriesComponent } from './recip-categories/recip-categories.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { MenuCategoryComponent } from './menu-category/menu-category.component';
import { NewCategoryComponent } from './new-category/new-category.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryComponent
  }, {
    path: 'recipe_categories',
    component: RecipCategoriesComponent
  },
  {
    path: 'menu_categories',
    component: MenuCategoryComponent
  },
  {
    path: 'product_categories',
    component: ProductCategoriesComponent
  },
  {
    path: 'menu_categories/:id',
    component: NewCategoryComponent
  },
  {
    path: 'product_categories/:id',
    component: NewCategoryComponent
  },
  {
    path: 'recipe_categories/:id',
    component: NewCategoryComponent
  },
  {
    path: 'new_category',
    component: NewCategoryComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
