import { Component, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SitesService } from './services/sites.service';
import {  Store } from './interfaces/SitesInterface';
import { AuthServices } from '../auth/services/auth.service';
import { GlobalService } from 'src/app/global/services/global.service';
import { LoadingService } from 'src/app/global/services/loading.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';
import { MyStoreParams } from '../store/interfaces/store';

interface Animal {
  name: string;
  sound: string;
}

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css'],
})
export class SitesComponent {
  private sites = inject(SitesService);
  private global = inject(GlobalService);
  private loading = inject(LoadingService);
  private auth = inject(AuthServices);
  private snack = inject(SnackbarService)


  user = this.global.User();
  sitesControl = new FormControl<Store | null>(null, Validators.required);
  department!: Store[];

  ngOnInit(): void {
    // this.sites.LoginSites();
    
    // if(!this.user.groups.includes("Call Center Gsoft")){
    //   this.sites
    //   .asignarSite(this.user.id, 45)
    //   .then((result) => {
    //     this.global.formatearUser(true, 'oficina', { id:45, name:'Sede Principal (Montesano)', status: true });
    //     this.snack.openSnackBar("Sucursal Montesano")
    //     this.sites.LoginSites();
    //   })
    //   .catch((err) => {
    //     this.snack.openSnackBar("Error 500")
    //     this.loading.hideLoading()
    //   });
    // }

  
    this.sites
      .getStores(this.user.id)
      .then((result) => {
        this.department = result;
      })
      .catch((err:any) => {
        if (err.status == 401) {
          this.snack.openSnackBar(err.error.code)
          this.auth.logout();
        }
        this.snack.openSnackBar("Error 500")
      });
  }

  onSubmit() {
    this.loading.showLoading();
    const store = this.sitesControl.value?.id ?? 0;
    const store_name = this.sitesControl.value?.store__name;
    this.sites
      .assignStore(this.user.id, store)
      .then((result) => {
        this.global.formatearUser(true, 'store', { store, store_name});
        this.sites.LoginSites();
      })
      .catch((err) => {
        console.log(err)
        this.snack.openSnackBar("Ocurrio un error, intente nuevamente")
        this.loading.hideLoading()
      });
  }

  logout(){
    this.auth.logout()
  }
}
