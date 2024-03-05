import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoresAllComponent } from './components/stores-all/stores-all.component';
import { MyStoreComponent } from './my-store.component';
import { StoreDetailsComponent } from './components/store-details/store-details.component';
import { DialogAddStoreComponent } from './components/dialog-add-store/dialog-add-store.component';

const routes: Routes = [
  {
    path: '',
    component: MyStoreComponent,
    children:[
      {
        path :'',
        redirectTo:'',
        pathMatch:'full'
      },
      {
        path: '',
        component: StoresAllComponent
      },
      {
        path: 'my_store/:id',
        component: StoreDetailsComponent
      },
      {
        path: 'new_branch',
        component: DialogAddStoreComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyStoreRoutingModule { }
