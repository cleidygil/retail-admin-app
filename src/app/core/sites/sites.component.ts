import { Component, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SitesService } from './services/sites.service';
import { Store } from './interfaces/SitesInterface';
import { AuthServices } from '../auth/services/auth.service';
import { GlobalService } from 'src/app/global/services/global.service';
import { LoadingService } from 'src/app/global/services/loading.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';
import { AllStore, MyStoreParams } from '../store/interfaces/store';
import { Router } from '@angular/router';

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
  private router = inject(Router)

  user = this.global.User();
  sitesControl = new FormControl<AllStore | null>(null, Validators.required);

  ngOnInit(): void {
    console.log('sites')
    this.sites.CreateStore()
    return
  if (this.user.store == null) {
      this.router.navigate(['new-store'])
      return
    }
    this.sites
      .getStores(this.user.id)
      .then((result) => {
        if (result.length > 0) {
          this.asignarStore(result)
          return
        }
        this.router.navigate(['new-store'])
        return
      })
      .catch((err: any) => {
        if (err.status == 401) {
          this.snack.openSnackBar(err.error.code)
          this.auth.logout();
        }
        this.snack.openSnackBar("Error 500")
      });
  }

asignarStore(department:AllStore[]){
 let store = department[0].id
 let store_name = department[0].name
  this.sites
      .assignStore(this.user.id, store)
      .then((result) => {
        this.global.formatearUser(true, 'store', { store, store_name });
        this.sites.LoginSites();
      })
      .catch((err) => {
        console.log(err)
        this.snack.openSnackBar("Ocurrio un error, intente nuevamente")
        this.loading.hideLoading()
      }); 
}

  onSubmit() {
    this.loading.showLoading();
    const store = this.sitesControl.value?.id ?? 0;
    const store_name = this.sitesControl.value?.name;
    this.sites
      .assignStore(this.user.id, store)
      .then((result) => {
        this.global.formatearUser(true, 'store', { store, store_name });
        this.sites.LoginSites();
      })
      .catch((err) => {
        console.log(err)
        this.snack.openSnackBar("Ocurrio un error, intente nuevamente")
        this.loading.hideLoading()
      });
  }

  logout() {
    this.auth.logout()
  }
}
