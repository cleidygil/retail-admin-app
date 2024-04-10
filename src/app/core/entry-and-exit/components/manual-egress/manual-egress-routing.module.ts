import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManualEgressComponent } from './manual-egress.component';
import { OptionInventoryComponent } from '../option-inventory/option-inventory.component';
import { SalesRawMaterialComponent } from '../sales-raw-material/sales-raw-material.component';
import { WarehousesComponent } from './warehouses/warehouses.component';

const routes: Routes = [
  {
    path: '',
    component: ManualEgressComponent
  },
  {
    path: 'option_inventory',
    component: OptionInventoryComponent
  },
  {
    path: 'sales/:id',
    component: SalesRawMaterialComponent
  },
  {
    path: 'raw_material/:id',
    component: SalesRawMaterialComponent
  },
  {
    path: 'products_warehouses',
    component: WarehousesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManualEgressRoutingModule { }
