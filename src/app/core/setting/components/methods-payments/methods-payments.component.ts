import { Component, inject } from '@angular/core';
import { AllStore, MyStoreParams } from 'src/app/core/store/interfaces/store';
import { StoreService } from 'src/app/core/store/services/store.service';

@Component({
  selector: 'app-methods-payments',
  templateUrl: './methods-payments.component.html',
  styleUrls: ['./methods-payments.component.css']
})
export class MethodsPaymentsComponent {
  ruta:string= 'method_store'
}
