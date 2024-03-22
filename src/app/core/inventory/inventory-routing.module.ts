import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from './inventory.component';
import { SalesInventoryComponent } from './components/sales-inventory/sales-inventory.component';
import { RawMaterialComponent } from './components/raw-material/raw-material.component';

const routes: Routes = [
  {
    path: '',
    component: InventoryComponent

  },
  {
    path: 'sales_inventory',
    component: SalesInventoryComponent
  },
  {
    path: 'raw_material',
    component: RawMaterialComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
