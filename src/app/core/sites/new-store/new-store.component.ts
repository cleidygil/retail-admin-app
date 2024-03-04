import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/global/services/global.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';
import { MethosdParams } from '../../store/interfaces/store';
import { StoreService } from '../../store/services/store.service';
import { SitesService } from '../services/sites.service';
import { AuthServices } from '../../auth/services/auth.service';

@Component({
  selector: 'app-new-store',
  templateUrl: './new-store.component.html',
  styleUrls: ['./new-store.component.css']
})
export class NewStoreComponent {
  private services = inject(StoreService)
  private siteServices = inject(SitesService)
  private snack = inject(SnackbarService)
  private global = inject(GlobalService)
  private auth = inject(AuthServices)
  paso1: boolean = true
  paso2: boolean = false
  pasoFinal: boolean = false
  end: boolean = false
  value1: any
  value2: any
  valueEnd: any
  user = this.global.User()
  img: any
  onSubmit() {
    let paso1 = this.siteServices.paso1.value
    let paso2 = this.siteServices.paso2.value
    let paso3 = this.siteServices.pasoFinal.value
    console.log(paso3)
    this.img = this.siteServices.pasoFinal.value
    let payments = { payment_methods: [paso2] }
    let body = { ...paso1, ...payments }
    console.log(body)
    this.services.setMyStore(body).then((res) => {
      this.pasoFinal = !this.pasoFinal
      this.end = !this.end
      this.snack.openSnackBar("Tienda creada exitosamente")
    }).catch((error) => {
      this.snack.openSnackBar("Ocurrio un error, por favor intente nuevamente")
    })
  }
  goStore() {
    this.siteServices.LoginSites()
  }
  logout() {
    this.auth.logout()
  }
}
