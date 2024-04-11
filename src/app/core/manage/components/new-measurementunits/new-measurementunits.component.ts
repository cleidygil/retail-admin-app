import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AllStore, MyStoreParams } from 'src/app/core/store/interfaces/store';
import { StoreService } from 'src/app/core/store/services/store.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';
import { ManageService } from '../../services/manege.service';
import { Management, Measurementunit, Measurementunits } from '../../interface/manege.interface';

@Component({
  selector: 'app-new-measurementunits',
  templateUrl: './new-measurementunits.component.html',
  styleUrls: ['./new-measurementunits.component.css']
})
export class NewMeasurementunitsComponent {
  private services = inject(ManageService)
  private storeServices = inject(StoreService)
  private router = inject(Router)
  private snack = inject(SnackbarService)
  private activateRou = inject(ActivatedRoute);

  sub!: Subscription
  id: number | null = null

  image: string = ''
  mystores: AllStore[] = []
  options = new FormGroup({
    option: new FormControl<string>('')
  })
  muform = new FormGroup({
    name: new FormControl('', [Validators.required]),
    value: new FormControl('', [Validators.required, Validators.maxLength(5), Validators.minLength(1), Validators.pattern('[0-9]*')]),
    abbreviation: new FormControl('', [Validators.required]),
    equivalence: new FormControl<any>('', [Validators.required]),
    cantidad: new FormControl<any>('')
  })
  hourform = new FormGroup({
    name: new FormControl('', [Validators.required]),
    currency: new FormControl('', [Validators.required]),
    cost: new FormControl('', [Validators.required, Validators.minLength(0), Validators.pattern('[0-9]*')]),
    value: new FormControl('', [Validators.required, Validators.maxLength(5), Validators.minLength(1), Validators.pattern('[0-9]*')]),
    abbreviation: new FormControl('', [Validators.required]),
    equivalence: new FormControl<any>('', [Validators.required]),
    cantidad: new FormControl<any>('')

  })
  mu: Measurementunit[] = []
  constructor() {
    this.sub = this.activateRou.params.subscribe((data) => {
      this.id = Number(data['id']) || null
    })
  }
  ngOnInit(): void {
    if (this.id != null) {
      this.muform.disable()
      this.options.disable()
      this.hourform.disable()
      this.getMUID()
    }
    this.options.valueChanges.subscribe(data => {
      this.getMu()
    })
    this.getMu()
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
    const valor = this.muform.value
    const hour = this.hourform.value
    let body: any = {
      store: this.services.user.store,
      name: valor.name,
      abbreviation: valor.abbreviation,
      value: valor.value,
      equivalence: valor.equivalence
    };
    if (this.options.value.option === 'true') {
      body = {
        ...body,
        name: hour.name,
        cost: hour.cost,
        currency: hour.currency,
        abbreviation: hour.abbreviation,
        value: hour.value,
        equivalence: hour.equivalence
      }
    }
    if (this.id != null) {
      this.services.patchMeasurementunits(body, Number(this.id)).then((res) => {
        this.snack.openSnackBar("Unidad de medida  actualizada exitosamente");
        this.router.navigate(['/home/management/measurement_units'])
      }).catch((error) => {
        if (error.status == 400) {
          this.snack.openSnackBar(error.error?.equivalence?.equivalence)
          this.snack.openSnackBar(error.error?.currency.length > 0 ? error.error?.currency[0] : '')
          return
        }
        this.snack.openSnackBar("Ocurrio un error, por favor intente nuevamente")
        return
      })
      return
    }

    this.services.setMeasurementunits(body).then((res) => {
      this.snack.openSnackBar("Unidad de medida creada exitosamente");
      this.router.navigate(['/home/management/measurement_units'])
    }).catch((error) => {
      if (error.status == 400) {
        this.snack.openSnackBar(error.error?.equivalence?.equivalence)
        this.snack.openSnackBar(error.error?.currency.length > 0 ? error.error?.currency[0] : '')
        return
      }
      this.snack.openSnackBar("Ocurrio un error, por favor intente nuevamente")
      return
    })
    return
  }
  getMu() {
    const params: Management = new Management()
    params.remove_pagination = 'true'
    params.work_hour = this.options.value.option || ''
    this.services.getMeasurementunits(params).then((result) => {
      this.mu = result
    }).catch((err) => {
    });
  }
  changeSelection() {
    let val = this.muform.get('equivalence')?.value
    let id = this.mu.filter(i => i.id == val).map(i => i.value)
    this.muform.get('cantidad')?.setValue(id[0])
  }
  changeSelection2() {
    let val = this.hourform.get('equivalence')?.value
    let id = this.mu.filter(i => i.id == val).map(i => i.value)
    this.hourform.get('cantidad')?.setValue(id[0])
  }
  getMUID() {
    this.services.getMeasurementunitsId(Number(this.id)).then((result) => {
      console.log(result.equivalence)
      
      if (result.currency == null) {
        this.getMu()
        this.options.get('option')?.setValue('false')
        this.muform.patchValue({
          name: result.name,
          abbreviation: result.abbreviation,
          value: result.value,
          equivalence: result.equivalence,
        })
        this.changeSelection()
        console.log(this.muform.get('equivalence')?.value);
        return
      }
      this.getMu()
      this.options.get('option')?.setValue('true')
      this.hourform.patchValue({
        name: result.name,
        abbreviation: result.abbreviation,
        value: result.value,
        equivalence: result.equivalence,
        cost: result.cost,
        currency: result.currency
      })
      this.changeSelection2()

      return
      // this.image = result.image
    }).catch((error) => {
      this.snack.openSnackBar("Ocurrio un error! Por favor vuelva a intentarlo")
    })
  }
  deleteMU() {
    this.services.deleteMeasurementunits(Number(this.id)).then((result) => {
      this.snack.openSnackBar("Unidad de medida eliminada exitosamente");
      this.router.navigate(['/home/management/measurement_units']);
    }).catch((error) => {
      this.snack.openSnackBar("Ocurrio un error! Por favor vuelva a intentarlo")
    })
  }

}
