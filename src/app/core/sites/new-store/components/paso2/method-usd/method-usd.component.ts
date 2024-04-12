import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SitesService } from 'src/app/core/sites/services/sites.service';

@Component({
  selector: 'app-method-usd',
  templateUrl: './method-usd.component.html',
  styleUrls: ['./method-usd.component.css']
})
export class MethodUsdComponent {
  @Output() methods = new EventEmitter()
  @Input() input: any
  payments!: FormGroup
  private sitesServices = inject(SitesService)


  ngOnInit(): void {
    this.payments = new FormGroup({
      sender: new FormControl(null),
      bank: new FormControl(null),
      bank_account: new FormControl(null),
      email: new FormControl('', [Validators.required, Validators.email]),
      identification: new FormControl(null),

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
        identification: valor?.identification,

      })
      this.input = valor?.payment_method
    }
  }
}
