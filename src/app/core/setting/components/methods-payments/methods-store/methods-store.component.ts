import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, SubscriptionLike } from 'rxjs';
import { PaymentMethod } from 'src/app/core/store/interfaces/store';
import { StoreService } from 'src/app/core/store/services/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-methods-store',
  templateUrl: './methods-store.component.html',
  styleUrls: ['./methods-store.component.css']
})
export class MethodsStoreComponent {
  private servicesStore = inject(StoreService);
  private activateRou = inject(ActivatedRoute)
  private router = inject(Router)

  store_payment_methods: PaymentMethod[] = []
  sub!: Subscription
  id:  number | null = null
  store: number = 0
  constructor() {
    this.activateRou.params.subscribe(data => {
      this.id = Number(data['id'])
      this.store = Number(data['store'])
    })
  }
  ngOnInit(): void {
    this.getAllStore()
  }

  getAllStore() {
    this.servicesStore.getMyStorePaymentMethods(this.store).then((result) => {
      this.store_payment_methods = result
    }).catch((err) => {
    });
  }
  editMethods(id:any){
    this.router.navigate(['/home/settings/methods_payments/'+this.store+"/method_store/"+ id]);
  }
}
