import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistributionsMediumRoutingModule } from './distributions-medium-routing.module';
import { AllDistributionsMediumComponent } from './all-distributions-medium/all-distributions-medium.component';
import { NewDistributionsMediumComponent } from './new-distributions-medium/new-distributions-medium.component';
import { MaterialDesignModule } from 'src/app/components-iu/material-design.module';


@NgModule({
  declarations: [
    AllDistributionsMediumComponent,
    NewDistributionsMediumComponent
  ],
  imports: [
    CommonModule,
    DistributionsMediumRoutingModule,
    MaterialDesignModule,
  ]
})
export class DistributionsMediumModule { }
