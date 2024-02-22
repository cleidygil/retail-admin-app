import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoginGuard } from './core/auth/guards/is-login.guard';
import { IsLogoutGuard } from './core/auth/guards/is-logout.guard';
import { SitesGuard } from './core/sites/guard/sites.guard';


const routes: Routes = [{
  path :'',
  redirectTo:'login',
  pathMatch:'full'
},
{
  path:'login',
  loadChildren:()=>import('./core/auth/auth.module').then(m=>m.AuthModule),
  canActivate:[IsLogoutGuard]
},
{
  path:'sites',
  loadChildren:()=>import('./core/sites/sites.module').then(m=>m.SitesModule),
  canActivate:[false]
},
{
  path:'home',
  loadChildren:()=>import('../app/core/home/home.module').then(m=>m.HomeModule),
  canActivate:[IsLoginGuard]
},
{
  path:'**',
  redirectTo:'login',
  pathMatch:'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
