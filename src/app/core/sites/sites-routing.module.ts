import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SitesComponent } from './sites.component';
import { NewStoreComponent } from './new-store/new-store.component';
const routes: Routes = [{
  path: '',
  component: SitesComponent
},
{
  path: 'new-store',
  component: NewStoreComponent
}
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SitesRoutingModule { }
