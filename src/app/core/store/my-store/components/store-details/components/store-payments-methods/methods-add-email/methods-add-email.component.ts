import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-methods-add-email',
  templateUrl: './methods-add-email.component.html',
  styleUrls: ['./methods-add-email.component.css']
})
export class MethodsAddEmailComponent {
  @Output() values = new EventEmitter<any>()
  payments!: FormGroup

  ngOnInit(): void {
    this.payments = new FormGroup({
      bank: new FormControl(null),
      bank_account: new FormControl(null),
      email: new FormControl('', [Validators.required, Validators.email]),
    })
    this.payments.valueChanges.subscribe(changes => {
      this.values.emit(changes)
    })
  }
}
