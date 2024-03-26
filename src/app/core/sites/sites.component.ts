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

    this.sites
      .getStores(this.user.id)
      .then((result) => {
        if (result.length > 0) {
          this.asignarStore(result)
          return
        }
        this.sites.CreateStore()
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

  asignarStore(department: AllStore[]) {
    let mainArr = department.filter((item) => item.parent == null).map(item => item)
    let store: any = {}
    let main: any = { main: mainArr[0].id, main_name: mainArr[0].name }
    this.user.groups.map((item: string) => {
      if (item == "ADMINISTRADOR") {
        store = {
          store: mainArr[0].id,
          store_name: mainArr[0].name
        }
        return
      }
      store = {
        store: this.user.store,
        store_name: this.user.store_name
      }
      return
    })
    this.sites
      .assignStore(this.user.id, store.id)
      .then((result) => {
        this.global.formatearUser(true, 'store', store)
        this.global.formatearUser(true, 'main', main);
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
