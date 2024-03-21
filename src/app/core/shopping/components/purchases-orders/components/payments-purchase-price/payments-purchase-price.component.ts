import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingService } from 'src/app/core/shopping/services/shopping.service';

@Component({
  selector: 'app-payments-purchase-price',
  templateUrl: './payments-purchase-price.component.html',
  styleUrls: ['./payments-purchase-price.component.css']
})
export class PaymentsPurchasePriceComponent {
  private services = inject(ShoppingService)
  private activateRou = inject(ActivatedRoute);

  sub!: Subscription
  id!: number
  value: any
  constructor() {
    this.sub = this.activateRou.params.subscribe((data) => {
      this.id = Number(data['id'])
    })
  }
  options: any[] = [
    { id: 1, name: 'AL CONTADO' },
    { id: 2, name: 'CREDITO' },
  ]
  selection = new FormGroup({
    select: new FormControl<any>('')
  })
  ngOnInit(): void {
    this.selection.valueChanges.subscribe(data => {
      let body = {
        method_payment: this.selection.value.select,
        status: 4,
      }
      this.value = body
    })
  }


}
