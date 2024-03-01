import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/global/services/global.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';
import { MethosdParams } from '../../store/interfaces/store';
import { StoreService } from '../../store/services/store.service';

@Component({
  selector: 'app-new-store',
  templateUrl: './new-store.component.html',
  styleUrls: ['./new-store.component.css']
})
export class NewStoreComponent {
  private services = inject(StoreService)
  private snack = inject(SnackbarService)
  private global = inject(GlobalService)

  paso1: boolean = true
  paso2: boolean = false
  pasoFinal: boolean = false
  value1: any
  value2: any
  valueEnd:any
  user = this.global.User()

  onSubmit() {
    let body = {

    }
    console.log(body)
    this.services.setMyStore(body).then((res) => {
      this.snack.openSnackBar("Tienda creada exitosamente")
    }).catch((error) => {
      this.snack.openSnackBar("Ocurrio un error, por favor intente nuevamente")
    })
  }
}
