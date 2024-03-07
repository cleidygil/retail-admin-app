import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AllStore, MyStoreParams } from 'src/app/core/store/interfaces/store';
import { StoreService } from 'src/app/core/store/services/store.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';
import { ManageService } from '../../services/manege.service';

@Component({
  selector: 'app-new-suppliers',
  templateUrl: './new-suppliers.component.html',
  styleUrls: ['./new-suppliers.component.css']
})
export class NewSuppliersComponent {
  private services = inject(ManageService)
  private storeServices = inject(StoreService)
  private snack = inject(SnackbarService)
  private activateRou = inject(ActivatedRoute);
  private router = inject(Router)

  sub!: Subscription
  id: number | null = null

  image: string = ''
  mystores: AllStore[] = []
  supplierform = new FormGroup({
    'rif': new FormControl('', [Validators.required, Validators.max(10)]),
    'name': new FormControl('', [Validators.required]),
    'address': new FormControl('', [Validators.required]),
    'observation': new FormControl(''),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'store': new FormControl('', [Validators.required])
  })
  constructor() {
    this.sub = this.activateRou.params.subscribe((data) => {
      this.id = Number(data['id']) || null
    })
  }
  ngOnInit(): void {
    if (this.id != null) {
      this.getSupplierID()
    }
    this.getAllStore()
  }

  getAllStore() {
    const params = new MyStoreParams()
    params.parent = 'true'
    this.storeServices.getUserStores(params).then((result) => {
      this.mystores = result
    }).catch((err) => {
      console.log(err)
    });
  }
  onSubmit() {
    const valor = this.supplierform.value
    let body = {
      "name": valor.name,
      "rif": valor.rif,
      "address": valor.address,
      "email": valor.email,
      "observation": valor.observation,
      "image": '...',
      "store": valor.store,
    }
    if (this.id != null) {
      this.services.patchSuppliersID(body, Number(this.id)).then((res) => {
        this.snack.openSnackBar("Proveedor actualizado exitosamente");
        this.router.navigate(['/home/management/suppliers'])
      }).catch((error) => {
        this.snack.openSnackBar("Ocurrio un error, por favor intente nuevamente")
      })
      return
    }
    this.services.setSuppliers(body).then((res) => {
      this.snack.openSnackBar("Proveedor registrado exitosamente");
      this.router.navigate(['/home/management/suppliers'])
    }).catch((error) => {
      this.snack.openSnackBar("Ocurrio un error, por favor intente nuevamente")
    })
    return

  }
  getSupplierID() {
    this.services.getSuppliersId(Number(this.id)).then((result) => {
      this.supplierform.patchValue({
        name: result.name,
        store: result.store,
        rif: result.rif,
        email: result.email,
        address: result.address,
        observation: result.observation

      })
      // this.image = result.image
    }).catch((error) => {
      this.snack.openSnackBar("Ocurrio un error! Por favor vuelva a intentarlo")
    })
  }

}
