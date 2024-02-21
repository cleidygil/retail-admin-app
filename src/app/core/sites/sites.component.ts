import { Component, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SitesService } from './services/sites.service';
import { Department } from './interfaces/SitesInterface';
import { AuthServices } from '../auth/services/auth.service';
import { GlobalService } from 'src/app/global/services/global.service';
import { LoadingService } from 'src/app/global/services/loading.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';

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
  sitesControl = new FormControl<Department | null>(null, Validators.required);
  department!: Department[];

  ngOnInit(): void {
    this.sites.LoginSites();
     this.snack.openSnackBar("Sucursal Montesano")
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
    
    // this.sites
    //   .getDepartment()
    //   .then((result) => {
    //     this.department = result;
    //   })
    //   .catch((err:any) => {
    //     if (err.status == 401) {
    //       this.snack.openSnackBar(err.error.code)
    //       this.auth.logout();
    //     }
    //     this.snack.openSnackBar("Error 500")
    //   });
  }

  onSubmit() {
    this.loading.showLoading();
    const id = this.sitesControl.value?.id ?? 0;
    const name = this.sitesControl.value?.name;
    this.sites
      .asignarSite(this.user.id, id)
      .then((result) => {
        this.global.formatearUser(true, 'oficina', { id, name, status: true });
        this.sites.LoginSites();
      })
      .catch((err) => {
        this.snack.openSnackBar("Error 500")
        this.loading.hideLoading()
      });
  }

  logout(){
    this.auth.logout()
  }
}
