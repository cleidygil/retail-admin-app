import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MaterialDesignModule } from 'src/app/components-iu/material-design.module';
import { HomeComponent } from './home.component';
import { ConfirmDialogComponent } from 'src/app/global/components/confirm-dialog/confirm-dialog.component';
import { SnackbarComponent } from 'src/app/global/components/snackbar/snackbar.component';
import { LoadingComponent } from 'src/app/global/components/loading/loading.component';
import { MenuComponent } from './menu/menu.component';
import { SidenavComponent } from './sidenav/sidenav.component';


@NgModule({
  declarations: [HomeComponent, ConfirmDialogComponent, SnackbarComponent, LoadingComponent, MenuComponent, SidenavComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialDesignModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],

})
export class HomeModule { }
