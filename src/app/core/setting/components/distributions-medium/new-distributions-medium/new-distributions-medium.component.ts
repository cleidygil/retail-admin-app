import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SettingsService } from '../../../services/settings.service';
import { Settings } from '../../../interface/settings.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/global/services/snackbar.service';
import { StoreService } from 'src/app/core/store/services/store.service';

@Component({
  selector: 'app-new-distributions-medium',
  templateUrl: './new-distributions-medium.component.html',
  styleUrls: ['./new-distributions-medium.component.css']
})
export class NewDistributionsMediumComponent {
  private activateRou = inject(ActivatedRoute)
  private router = inject(Router)
  private services = inject(SettingsService)
  private storeservices = inject(StoreService)
  private snack = inject(SnackbarService)
  sub!: Subscription
  id: number = 0
  constructor() {
    this.activateRou.params.subscribe(data => {
      this.id = Number(data['id'])
    })
  }
  distribution: any[] = []

  dm = new FormGroup({
    distribution: new FormControl<any>('', [Validators.required])
  })
  ngOnInit(): void {
    this.getDistribution()

  }
  getDistribution() {
    const params: Settings = new Settings()
    this.services.getDistriMedium(params).then((result) => {
      this.distribution = result
    }).catch((error) => {
      console.log(error)
    })
  }

  onSubmit() {
    let body = {
      distribution_medium: Number(this.dm.value.distribution), method: true
    }
   
    this.storeservices.postMyStoreDistributionsMedium(body, this.id).then((res) => {
      this.snack.openSnackBar("Medio de consumo agregado exitosamente")
      this.router.navigate(['/home/settings/distributions_medium/all/', this.id])
    }).catch((error) => {
      this.snack.openSnackBar("Ocurrio un error, por favor intente nuevamente")
      this.snack.openSnackBar(error.error.message)
    })
  }
  
}
