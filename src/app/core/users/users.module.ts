import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { MaterialDesignModule } from 'src/app/components-iu/material-design.module';
import { NewUserComponent } from './new-user/new-user.component';


@NgModule({
  declarations: [UsersComponent, NewUserComponent],
  imports: [
    CommonModule,
    UsersRoutingModule, MaterialDesignModule
  ]
})
export class UsersModule { }
