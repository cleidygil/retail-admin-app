import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SitesRoutingModule } from './sites-routing.module';
import { SitesComponent } from './sites.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialDesignModule } from 'src/app/components-iu/material-design.module';

@NgModule({
  declarations: [SitesComponent],
  imports: [CommonModule, SitesRoutingModule, MaterialDesignModule,ReactiveFormsModule],
})
export class SitesModule {}
