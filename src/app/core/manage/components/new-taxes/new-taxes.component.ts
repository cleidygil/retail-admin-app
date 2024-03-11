import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllStore, MyStoreParams } from 'src/app/core/store/interfaces/store';
import { StoreService } from 'src/app/core/store/services/store.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';
import { ManageService } from '../../services/manege.service';

@Component({
  selector: 'app-new-taxes',
  templateUrl: './new-taxes.component.html',
  styleUrls: ['./new-taxes.component.css']
})
export class NewTaxesComponent {
  private services = inject(ManageService)
  private storeServices = inject(StoreService)
  private snack = inject(SnackbarService)
  private router = inject(Router)

  image: string = ''
  mystores: AllStore[] = []
  taxesform = new FormGroup({
    name: new FormControl('', [Validators.required]),
    store: new FormControl<any>('', [Validators.required]),
    acronym: new FormControl('', [Validators.required]),
    percentage: new FormControl('', [Validators.required, Validators.maxLength(3), Validators.minLength(1), Validators.pattern('[0-9]*')])
  })
  constructor() { }
  ngOnInit(): void {
    this.getAllStore()
    this.taxesform.hasError('required')
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
    const valor = this.taxesform.value
    // let body = {
    //   "name": valor.name,
    //   "store": valor.store,
    //   acronym
    // }
    this.services.postTaxes( valor).then((res) => {
      this.snack.openSnackBar("Impuesto creado exitosamente");
      this.router.navigate(['/home/management/taxes'])
    }).catch((error) => {
      this.snack.openSnackBar("Ocurrio un error, por favor intente nuevamente")
    })

  }



}
