import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'store',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'store',
        loadChildren: () => import('../store/store.module').then(m => m.StoreModule)
      },
      {
        path: 'users',
        loadChildren: () => import('../users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'supplies',
        loadChildren: () => import('../supplies/supplies.module').then(m => m.SuppliesModule)
      },
      {
        path: 'management',
        loadChildren: () => import('../manage/manage.module').then(m => m.ManageModule)
      },
      {
        path: 'shopping',
        loadChildren: () => import('../shopping/shopping.module').then(m => m.ShoppingModule)
      },
      {
        path: 'inventory',
        loadChildren: () => import('../inventory/inventory.module').then(m => m.InventoryModule)
      },
      {
        path: 'promotions',
        loadChildren: () => import('../promotions/promotions.module').then(m => m.PromotionsModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../setting/setting.module').then(m => m.SettingModule)
      },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
