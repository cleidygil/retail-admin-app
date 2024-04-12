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

}
