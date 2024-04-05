import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntryAndExitComponent } from './entry-and-exit.component';
import { ComponentsComponent } from './components/components.component';
import { ManualEgressComponent } from './components/manual-egress/manual-egress.component';
import { ManualEntryComponent } from './components/manual-entry/manual-entry.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { WarehousesComponent } from './components/warehouses/warehouses.component';

const routes: Routes = [
  {
    path: '',
    component: EntryAndExitComponent
  },
  {
    path: 'options',
    component: ComponentsComponent
  },
  {
    path: 'egress',
    component: ManualEgressComponent
  },
  {
    path: 'income',
    component: ManualEntryComponent
  },
  {
    path: 'warehouses',
    component: WarehousesComponent
  },
  {
    path: 'inventories',
    component: InventoryComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntryAndExitRoutingModule { }
