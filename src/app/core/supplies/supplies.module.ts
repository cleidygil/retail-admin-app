import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuppliesRoutingModule } from './supplies-routing.module';
import { SuppliesComponent } from './supplies.component';
import { MaterialDesignModule } from 'src/app/components-iu/material-design.module';
import { NewProductComponent } from './components/new-product/new-product.component';
import { ProductsAllComponent } from './components/products-all/products-all.component';
import { ProductSaleComponent } from './components/new-product/product-sale/product-sale.component';
import { RecipesAllComponent } from './components/recipes-all/recipes-all.component';
import { NewRecipesComponent } from './components/new-recipes/new-recipes.component';
import { RecipesSaleComponent } from './components/new-recipes/recipes-sale/recipes-sale.component';
import { AvailableIngredientsComponent } from './components/new-recipes/available-ingredients/available-ingredients.component';
import { SelectedIngredientsComponent } from './components/new-recipes/available-ingredients/selected-ingredients/selected-ingredients.component';
import { DialogQuantityUnitOfMeasurementComponent } from './components/new-recipes/dialog-quantity-unit-of-measurement/dialog-quantity-unit-of-measurement.component';
import { DialogBranchRecipesComponent } from './components/new-recipes/dialog-branch-recipes/dialog-branch-recipes.component';
import { DialogDetailRecipesComponent } from './components/recipes-all/dialog-detail-recipes/dialog-detail-recipes.component';
import { DialogDeleteRecipeComponent } from './components/recipes-all/dialog-delete-recipe/dialog-delete-recipe.component';


@NgModule({
  declarations: [SuppliesComponent, NewProductComponent, ProductsAllComponent, ProductSaleComponent, RecipesAllComponent, NewRecipesComponent, RecipesSaleComponent, AvailableIngredientsComponent, SelectedIngredientsComponent, DialogQuantityUnitOfMeasurementComponent, DialogBranchRecipesComponent, DialogDetailRecipesComponent, DialogDeleteRecipeComponent],
  exports:[ProductSaleComponent],
  imports: [
    CommonModule,
    SuppliesRoutingModule,
    MaterialDesignModule
  ]
})
export class SuppliesModule { }
