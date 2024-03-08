import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistributionsMediumComponent } from './distributions-medium.component';
import { AllDistributionsMediumComponent } from './all-distributions-medium/all-distributions-medium.component';
import { NewDistributionsMediumComponent } from './new-distributions-medium/new-distributions-medium.component';

const routes: Routes = [
  {
    path: '',
    component: DistributionsMediumComponent
  },
  {
    path: 'all/:id',
    component: AllDistributionsMediumComponent
  },
  {
    path: 'new/:id',
    component: NewDistributionsMediumComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistributionsMediumRoutingModule { }
