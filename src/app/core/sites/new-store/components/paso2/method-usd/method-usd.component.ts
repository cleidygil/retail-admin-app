import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-method-usd',
  templateUrl: './method-usd.component.html',
  styleUrls: ['./method-usd.component.css']
})
export class MethodUsdComponent {
  @Output() methods = new EventEmitter()
  payments!: FormGroup

  ngOnInit(): void {
    this.payments = new FormGroup({
      bank: new FormControl(null),
      bank_account: new FormControl(null),
      email: new FormControl('', [Validators.required, Validators.email]),
    })
    this.payments.valueChanges.subscribe(changes => {
      this.methods.emit(changes)
    })
  }
}
