import { Component, Input, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AllStore, MethosdParams } from 'src/app/core/store/interfaces/store';
import { StoreService } from 'src/app/core/store/services/store.service';
import { GlobalService } from 'src/app/global/services/global.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';

@Component({
  selector: 'app-store-info',
  templateUrl: './store-info.component.html',
  styleUrls: ['./store-info.component.css']
})
export class StoreInfoComponent {
  @Input() info!: AllStore
  private services = inject(StoreService)
  private snack = inject(SnackbarService)
  private global = inject(GlobalService)

  user:any=''
  constructor() {
    this.user = this.global.User()
   }

  storeForm = new FormGroup({
    'rif': new FormControl(''),
    'name': new FormControl('', [Validators.required]),
    'address': new FormControl('', [Validators.required]),
    // 'phone': new FormControl('', [Validators.required, Validators.maxLength(11), Validators.pattern('[0-9]*')]),
    'localphone': new FormControl('', [Validators.required, Validators.maxLength(11), Validators.pattern('[0-9]*')]),
    'description': new FormControl(''),
    'currency': new FormControl<any>('', [Validators.required])
  })

  ngOnInit(): void {
    setTimeout(() => {
      this.user = this.global.User()
      this.storeForm.patchValue({
        rif: this.info?.rif,
        name: this.info?.name,
        address: this.info?.address,
        localphone: this.info?.localphone,
        description: this.info?.description,
        currency: this.info?.currency?.toString()
      })
    }, 2500)

  }


  onSubmit() {
    const valor = this.storeForm.value
    let body = {
      "rif": null,
      "name": valor.name,
      "address": valor.address,
      "phone": valor.localphone,
      "parent":this.user.store,
      "localphone": valor.localphone,
      "description": valor.description,
      "currency": null
    }
    this.services.patchMyStoreID(body, this.info?.id).then((res) => {
      this.snack.openSnackBar("Tienda actualizada exitosamente")
    }).catch((error) => {
      this.snack.openSnackBar("Ocurrio un error, por favor intente nuevamente")
    })
  }

}
