import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SitesService } from 'src/app/core/sites/services/sites.service';
import { StoreService } from 'src/app/core/store/services/store.service';

@Component({
  selector: 'app-method-tdc',
  templateUrl: './method-tdc.component.html',
  styleUrls: ['./method-tdc.component.css']
})
export class MethodTdcComponent {
  @Output() methods = new EventEmitter()
  @Input() input:any
  private services = inject(StoreService)
  private sitesServices = inject(SitesService)

  payments!: FormGroup
  bank_arr: any[] = []
  ngOnInit(): void {
    this.payments = new FormGroup({
      bank: new FormControl<any>(null),
      bank_account: new FormControl(null),
      email: new FormControl(null),
      sender: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.pattern('[0-9]*')])
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
      })
      this.input = valor?.payment_method
    }
  }
 
}
