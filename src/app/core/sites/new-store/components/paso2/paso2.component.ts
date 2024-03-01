import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Methods, MethosdParams } from 'src/app/core/store/interfaces/store';
import { StoreService } from 'src/app/core/store/services/store.service';
import { GlobalService } from 'src/app/global/services/global.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';
import { SitesService } from '../../../services/sites.service';

@Component({
  selector: 'app-paso2',
  templateUrl: './paso2.component.html',
  styleUrls: ['./paso2.component.css']
})
export class Paso2Component {
  @Output() value2 = new EventEmitter<any>()
  private services = inject(StoreService)
  private sitesServices = inject(SitesService)
  private snack = inject(SnackbarService)
  private global = inject(GlobalService)


  methodsform = new FormGroup({
    payment_methods: new FormControl<any>('', [Validators.required]),
    bank: new FormControl<any>('', [Validators.required]),
    bank_account: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.pattern('[0-9]*')]),
    email: new FormControl('', [Validators.required, Validators.email]),
  })
  user = this.global.User()
  methods_arr: any[] = []
  methods:any
  methods_selected = new FormControl<Methods | null>(null)
  ngOnInit(): void {
    this.getMethods()
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
    let body={
      payment_methods:[this.methods_selected.value?.id],
    }
    let body2 = {...body, ...this.methods}
    this.value2.emit(body2)
    this.sitesServices.paso2.next(body2)

  }
}
