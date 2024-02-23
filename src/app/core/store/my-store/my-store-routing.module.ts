import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoresAllComponent } from './components/stores-all/stores-all.component';
import { MyStoreComponent } from './my-store.component';

const routes: Routes = [
  {
    path: '',
    component: MyStoreComponent,
    children:[
      {
        path :'',
        redirectTo:'all_store',
        pathMatch:'full'
      },
      {
        path: 'all_store',
        component: StoresAllComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyStoreRoutingModule { }
