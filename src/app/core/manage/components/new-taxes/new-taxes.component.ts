import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  ActivatedRoute,Router } from '@angular/router';
import { AllStore, MyStoreParams } from 'src/app/core/store/interfaces/store';
import { StoreService } from 'src/app/core/store/services/store.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';
import { ManageService } from '../../services/manege.service';
import { Subscription } from 'rxjs';

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
  private activateRou = inject(ActivatedRoute);

  sub!: Subscription
  id: number | null = null
  store: number | null = null
  image: string = ''
  mystores: AllStore[] = []
  taxesform = new FormGroup({
    name: new FormControl('', [Validators.required]),
    store: new FormControl<any>('', [Validators.required]),
    acronym: new FormControl('', [Validators.required]),
    percentage: new FormControl('', [Validators.required, Validators.maxLength(3), Validators.minLength(1), Validators.pattern('[0-9]*')])
  })
  constructor() {
    this.sub = this.activateRou.params.subscribe((data) => {
      this.id = Number(data['id']) || null
      this.store = Number(data['store']) || null
    })
   }
  ngOnInit(): void {
    this.getAllStore()
    this.taxesform.hasError('required')
    if(this.id!=null){
      this.taxesform.disable()
      this.getTaxesID()
    }
  }

  getAllStore() {
    const params = new MyStoreParams()
    params.parent = 'true'
    this.storeServices.getUserStores(params).then((result) => {
      this.mystores = result
      console.log(result)
      console.log("result355")

    }).catch((err) => {
      console.log(err)
    });
  }
  onSubmit() {
    if(this.id!=null){
      this.services.patchTaxes( this.taxesform.value,Number(this.id) ).then((res) => {
        this.snack.openSnackBar("Impuesto actualizado exitosamente");
        this.router.navigate(['/home/management/taxes'])
      }).catch((error) => {
        this.snack.openSnackBar("Ocurrio un error, por favor intente nuevamente")
      })
    }else{
      this.services.postTaxes( this.taxesform.value).then((res) => {
        this.snack.openSnackBar("Impuesto creado exitosamente");
        this.router.navigate(['/home/management/taxes'])
      }).catch((error) => {
        this.snack.openSnackBar("Ocurrio un error, por favor intente nuevamente")
      })
    }
  }
  getTaxesID(){
    // params.page = this.nextPage
    this.services.getTaxesId(Number(this.id)).then((result) => {
      this.taxesform.patchValue({
         name:result.name,
         store:result.store,
         acronym:result.acronym,
         percentage: Number(result.percentage).toString()
      })
      console.log(result)
      console.log("result")
      // this.loading.hideLoading()
      // this.taxes = result
    }).catch((err) => {
      this.snack.openSnackBar("Ocurrio un error, por favor intente nuevamente")

    });
  }
  deleteTaxes(){
    this.services.deleteTaxesID(Number(this.id)).then((result) => {
      this.snack.openSnackBar("Impuesto elminado exitosamente");
      this.router.navigate(['/home/management/taxes'])
        }).catch((error) => {
      this.snack.openSnackBar("Ocurrio un error! Por favor vuelva a intentarlo")
    })
  }
}
