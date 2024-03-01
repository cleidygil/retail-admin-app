import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SitesRoutingModule } from './sites-routing.module';
import { SitesComponent } from './sites.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialDesignModule } from 'src/app/components-iu/material-design.module';
import { NewStoreComponent } from './new-store/new-store.component';
import { Paso1Component } from './new-store/components/paso1/paso1.component';
import { Paso2Component } from './new-store/components/paso2/paso2.component';
import { PasoFinalComponent } from './new-store/components/paso-final/paso-final.component';
import { MethodBsComponent } from './new-store/components/paso2/method-bs/method-bs.component';
import { MethodUsdComponent } from './new-store/components/paso2/method-usd/method-usd.component';

@NgModule({
  declarations: [SitesComponent, NewStoreComponent, Paso1Component, Paso2Component, PasoFinalComponent, MethodBsComponent, MethodUsdComponent],
  imports: [CommonModule, SitesRoutingModule, MaterialDesignModule,ReactiveFormsModule],
})
export class SitesModule {}
