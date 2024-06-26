import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoginGuard } from './core/auth/guards/is-login.guard';
import { IsLogoutGuard } from './core/auth/guards/is-logout.guard';
import { SitesGuard } from './core/sites/guard/sites.guard';


const routes: Routes = [{
  path: '',
  redirectTo: 'login',
  pathMatch: 'full'
},
{
  path:'login',
  loadChildren:()=>import('./core/auth/auth.module').then(m=>m.AuthModule),
  canActivate:[IsLogoutGuard]
},
{
  path:'branch',
  loadChildren:()=>import('../app/core/sites/sites.module').then(m=>m.SitesModule),
  canActivate:[IsLoginGuard]
},
{
  path:'home',
  loadChildren:()=>import('../app/core/home/home.module').then(m=>m.HomeModule),
  canActivate:[SitesGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
