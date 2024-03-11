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
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationsComponent } from './notifications/notifications.component';
import { EncabezadoComponent } from 'src/app/global/components/encabezado/encabezado.component';
import { PipeModule } from "../../global/pipes/pipe.module";
import { MyBranchsComponent } from 'src/app/global/components/my-branchs/my-branchs.component';


@NgModule({
    declarations: [HomeComponent, ConfirmDialogComponent, SnackbarComponent, LoadingComponent, MenuComponent, SidenavComponent, NotificationsComponent, EncabezadoComponent,  MyBranchsComponent],
    exports: [
        LoadingComponent,
        SnackbarComponent,
        EncabezadoComponent,
        MyBranchsComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [
        CommonModule,
        HomeRoutingModule,
        MaterialDesignModule,
        ReactiveFormsModule,
        PipeModule
    ]
})
export class HomeModule { }
