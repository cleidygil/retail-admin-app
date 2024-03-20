import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payments-purchase-price',
  templateUrl: './payments-purchase-price.component.html',
  styleUrls: ['./payments-purchase-price.component.css']
})
export class PaymentsPurchasePriceComponent {
  private activateRou = inject(ActivatedRoute);
  sub!: Subscription
  id: number | null = null
  constructor() {
    this.sub = this.activateRou.params.subscribe((data) => {
      this.id = Number(data['id']) || null
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
    this.selection.valueChanges.subscribe((data)=>
    {
      console.log(data, 'seleccion')
    })
  }
}
