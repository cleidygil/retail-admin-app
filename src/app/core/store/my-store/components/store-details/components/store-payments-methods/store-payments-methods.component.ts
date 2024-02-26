import { Component, Input, inject } from '@angular/core';
import { AllStore } from 'src/app/core/store/interfaces/store';
import { DialogPaymentsMethodsComponent } from '../../../dialog-payments-methods/dialog-payments-methods.component';
import { MatDialog } from '@angular/material/dialog';
import { StoreService } from 'src/app/core/store/services/store.service';
import { LoadingService } from 'src/app/global/services/loading.service';

@Component({
  selector: 'app-store-payments-methods',
  templateUrl: './store-payments-methods.component.html',
  styleUrls: ['./store-payments-methods.component.css']
})
export class StorePaymentsMethodsComponent {
  @Input() info!: AllStore
  private dialog = inject(MatDialog)

  private loading = inject(LoadingService)
  private services = inject(StoreService)

  store_payment_methods:any
  ngOnInit(): void {
    setTimeout(() => {
    this.getStoreID()
  }, 2500)
  }

  getStoreID() {
    this.services.getMyStorePaymentMethods(this.info?.id).then((result) => {
      this.store_payment_methods = result
    }).catch((err) => {
    });
  }

  openPaymentsMethods() {
    let dialogRef = this.dialog.open(DialogPaymentsMethodsComponent, {
      width: window.innerWidth > 639 ? '35%' : '100%',
      data: this.info
    })
    dialogRef.afterClosed().subscribe((data: boolean) => {
      if (data) {
        this.getStoreID()
      }
    })
  }
}
