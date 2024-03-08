import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AllStore, MyStoreParams } from 'src/app/core/store/interfaces/store';
import { StoreService } from 'src/app/core/store/services/store.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';
import { ManageService } from '../../services/manege.service';
import { Management } from '../../interface/manege.interface';

@Component({
  selector: 'app-new-measurementunits',
  templateUrl: './new-measurementunits.component.html',
  styleUrls: ['./new-measurementunits.component.css']
})
export class NewMeasurementunitsComponent {
  private services = inject(ManageService)
  private storeServices = inject(StoreService)
  private snack = inject(SnackbarService)
  private activateRou = inject(ActivatedRoute);
  private router = inject(Router)

  sub!: Subscription
  id: number | null = null
 
  image: string = ''
  mystores: AllStore[] = []
  muform = new FormGroup({
    name: new FormControl('', [Validators.required]),
    store: new FormControl<any>('', [Validators.required]),
    value: new FormControl('', [Validators.required]),
    abbreviation: new FormControl('', [Validators.required]),
    equivalence: new FormControl('', [Validators.required]),
    cantidad: new FormControl('', [Validators.required])
  })
  mu: any[] = []
  constructor() {
    this.sub = this.activateRou.params.subscribe((data) => {
      this.id = Number(data['id']) || null
    })
  }
  ngOnInit(): void {
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
    let body = {
      "name": valor.name,
      "image": null,
      "store": valor.store,
      abbreviation: valor.abbreviation,
      value: valor.value,
      equivalence: valor.equivalence
    }
    this.services.setMeasurementunits(body).then((res) => {
      this.snack.openSnackBar("Unidad de medida creada exitosamente");
      this.router.navigate(['/home/management/measurement_units'])
    }).catch((error) => {
      this.snack.openSnackBar("Ocurrio un error, por favor intente nuevamente")
    })
    return
    if (this.id != null) {
      this.services.patchBrandID(body, Number(this.id)).then((res) => {
        this.snack.openSnackBar("Marca actualizada exitosamente");
        this.router.navigate(['/home/management/brands'])
      }).catch((error) => {
        this.snack.openSnackBar("Ocurrio un error, por favor intente nuevamente")
      })
      return
    }
  }
  getMu() {
    const params: Management = new Management()
    params.remove_pagination = 'true'
    this.services.getMeasurementunits(params).then((result) => {
      this.mu = result
    }).catch((err) => {
    });
  }

 
}
