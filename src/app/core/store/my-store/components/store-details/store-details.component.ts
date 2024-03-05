import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoadingService } from 'src/app/global/services/loading.service';
import { StoreService } from '../../../services/store.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AllStore } from '../../../interfaces/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/global/services/global.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';

@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.css']
})
export class StoreDetailsComponent {
  private services = inject(StoreService)
  private loading = inject(LoadingService);
  private dialog = inject(MatDialog)
  private activateRou = inject(ActivatedRoute)
  private snack = inject(SnackbarService)
  private global = inject(GlobalService)
  id: number = 0
  sub!: Subscription
  info!: AllStore
  user: any = ''
  typeStore:any= ''
  constructor() {
    this.storeForm.disable()
    this.user = this.global.User()
    this.sub = this.activateRou.params.subscribe((data) => {
      this.id = Number(data['id'])
    })
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
    this.getStoreID()
    setTimeout(() => {
      this.user = this.global.User()
      this.typeStore = this.info?.parent == null ? "Tienda": "Sucursal"
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
  getStoreID() {
    this.loading.showLoading()
    this.services.getMyStoreID(this.id).then((result) => {
      this.loading.hideLoading()
      this.info = result
      this.typeStore = this.info?.parent == null ? "Tienda": "Sucursal"

    }).catch((err) => {
      this.loading.hideLoading()
    });
  }


  onSubmit() {
    const valor = this.storeForm.value
    let body = {
      "rif": null,
      "name": valor.name,
      "address": valor.address,
      "phone": valor.localphone,
      "parent":this.info?.parent == null ? null: this.user.store,
      "localphone": valor.localphone,
      "description": valor.description,
      "currency": null
    }
    this.services.patchMyStoreID(body, this.info?.id).then((res) => {
      this.snack.openSnackBar("Tienda actualizada exitosamente")
      this.storeForm.disable()
    }).catch((error) => {
      this.snack.openSnackBar("Ocurrio un error, por favor intente nuevamente")
    })
  }




}
