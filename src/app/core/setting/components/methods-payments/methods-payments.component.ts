import { Component, inject } from '@angular/core';
import { AllStore, MyStoreParams } from 'src/app/core/store/interfaces/store';
import { StoreService } from 'src/app/core/store/services/store.service';

@Component({
  selector: 'app-methods-payments',
  templateUrl: './methods-payments.component.html',
  styleUrls: ['./methods-payments.component.css']
})
export class MethodsPaymentsComponent {
  private servicesStore = inject(StoreService);
  mystores: AllStore[] = []

  ngOnInit(): void {
    this.getAllStore()
  }

  getAllStore() {
    const params = new MyStoreParams()
    params.parent = 'true'
    this.servicesStore.getUserStores(params).then((result) => {
      this.mystores = result
    }).catch((err) => {
      console.log(err)
    });
  }

}
