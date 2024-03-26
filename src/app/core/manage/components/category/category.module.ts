import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { MaterialDesignModule } from 'src/app/components-iu/material-design.module';
import { NewCategoryComponent } from './new-category/new-category.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { RecipCategoriesComponent } from './recip-categories/recip-categories.component';
import { MenuCategoryComponent } from './menu-category/menu-category.component';


@NgModule({
  declarations: [CategoryComponent,NewCategoryComponent, ProductCategoriesComponent, RecipCategoriesComponent, MenuCategoryComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    MaterialDesignModule
  ]
})
export class CategoryModule { }
