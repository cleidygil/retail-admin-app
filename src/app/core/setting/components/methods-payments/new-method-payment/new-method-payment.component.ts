import { Component, inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SitesService } from 'src/app/core/sites/services/sites.service';
import { MethosdParams } from 'src/app/core/store/interfaces/store';
import { StoreService } from 'src/app/core/store/services/store.service';
import { GlobalService } from 'src/app/global/services/global.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';
import { Method } from '../../../interface/settings.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-method-payment',
  templateUrl: './new-method-payment.component.html',
  styleUrls: ['./new-method-payment.component.css']
})
export class NewMethodPaymentComponent {
  private services = inject(StoreService)
  private sitesServices = inject(SitesService)
  private snack = inject(SnackbarService)
  private global = inject(GlobalService)
  private activateRou = inject(ActivatedRoute)
  private router = inject(Router)
  sub!: Subscription
  id: number = 0

  methodsform = new FormGroup({
    methods_selected: new FormControl<string | number>('')
  })
  user = this.global.User()
  methods_arr: any[] = []
  methods: Method | null = null
  inputMethod: any = ''

  constructor() {
    this.activateRou.params.subscribe(data => {
      this.id = Number(data['id'])
    })
  }
  ngOnInit(): void {
    console.log(this.methods)
    this.getMethods()
    this.methodsform.valueChanges.subscribe(change => {
      this.inputMethod = change.methods_selected
    })
  }
  getMethods() {
    const params: MethosdParams = new MethosdParams()
    this.services.getPaymentMethods(params).then((result) => {
      this.methods_arr = result
    }).catch((error) => {
      console.log(error)
    })
  }

  onSubmit() {
    let body = {
      payment_method: Number(this.inputMethod),   method: true
    }
    if (this.inputMethod == '5' || this.inputMethod == '4') {
      this.methods ={
        bank: "null",
        bank_account: 'null',
        email: 'null',
        sender: 'null',
      }
    }
    let body2 = { ...body, ...this.methods }
    this.services.postMyStorePaymentMethods(body2, this.id).then((res) => {
      this.snack.openSnackBar("Metodo de pago agregado exitosamente")
      this.router.navigate(['/home/settings/methods_payments/method_store/', this.id])
    }).catch((error) => {
      this.snack.openSnackBar("Ocurrio un error, por favor intente nuevamente")
      this.snack.openSnackBar(error.error.message)
    })
  }
  changeReset() {
    this.sitesServices.paso2.next(null)
    this.methods = null
  }
}
