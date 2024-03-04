import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SitesService } from 'src/app/core/sites/services/sites.service';
import { SitesRoutingModule } from 'src/app/core/sites/sites-routing.module';
import { MethosdParams } from 'src/app/core/store/interfaces/store';
import { StoreService } from 'src/app/core/store/services/store.service';

@Component({
  selector: 'app-method-bs',
  templateUrl: './method-bs.component.html',
  styleUrls: ['./method-bs.component.css']
})
export class MethodBsComponent {
  @Input() input: any
  @Output() methods = new EventEmitter()
  private services = inject(StoreService)
  private sitesServices = inject(SitesService)
  payments!: FormGroup
  bank_arr: any[] = []
  ngOnInit(): void {
    this.getMethods()
    this.payments = new FormGroup({
      bank: new FormControl<any>('', [Validators.required]),
      bank_account: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(20), Validators.pattern('[0-9]*')]),
      email: new FormControl(null),
      sender: new FormControl(null),
      phone: new FormControl<string | null>(null)
    })
    this.payments.valueChanges.subscribe(changes => {
      this.methods.emit(changes)
    })
    if (this.sitesServices.paso2.value != null) {
      console.log(this.sitesServices.paso2.value)
      let valor = this.sitesServices.paso2.value
      this.payments.patchValue({
        bank: valor?.bank,
        bank_account: valor?.bank_account,
        email: valor?.email,
        sender: valor?.sender,
        phone: valor?.phone
      })
      this.input = valor?.payment_method
    }
  }
  getMethods() {
    const params: MethosdParams = new MethosdParams()
    params.remove_pagination = 'true'
    this.services.getBanks(params).then((result) => {
      this.bank_arr = result
    }).catch((error) => {
      console.log(error)
    })
  }

}
