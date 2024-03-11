import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyBranchRoutingModule } from './my-branch-routing.module';
import { MyBranchComponent } from './my-branch.component';
import { HomeModule } from 'src/app/core/home/home.module';


@NgModule({
  declarations: [MyBranchComponent],
  imports: [
    CommonModule,
    MyBranchRoutingModule,
    HomeModule
  ]
})
export class MyBranchModule { }
