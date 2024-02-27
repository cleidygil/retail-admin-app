import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MethosdParams } from 'src/app/core/store/interfaces/store';
import { StoreService } from 'src/app/core/store/services/store.service';


@Component({
  selector: 'app-methods-add-bank-account',
  templateUrl: './methods-add-bank-account.component.html',
  styleUrls: ['./methods-add-bank-account.component.css']
})
export class MethodsAddBankAccountComponent {
  private services = inject(StoreService)
  @Output() values = new EventEmitter<any>()
  payments!: FormGroup
  bank_arr: any[] = []
  ngOnInit(): void {
    this.getMethods()
    this.payments = new FormGroup({
      bank: new FormControl<any>('', [Validators.required]),
      bank_account: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.pattern('[0-9]*')]),
      email: new FormControl(null)
    })
    this.payments.valueChanges.subscribe(changes => {
      this.values.emit(changes)
    })
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
