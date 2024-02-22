import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    children:[
      {
        path :'',
        redirectTo:'dashboard',
        pathMatch:'full'
      },
      {
        path: 'store',
        loadChildren:()=>import('../store/store.module').then(m=>m.StoreModule)
      },
      {
        path: 'dashboard',
        loadChildren:()=>import('../dashboard/dashboard.module').then(m=>m.DashboardModule)
      },
      {
        path: 'settings',
        loadChildren:()=>import('../setting/setting.module').then(m=>m.SettingModule)
      },

    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
