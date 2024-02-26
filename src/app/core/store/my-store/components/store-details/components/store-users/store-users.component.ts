import { Component, Input, inject } from '@angular/core';
import { AllStore } from 'src/app/core/store/interfaces/store';
import { StoreService } from 'src/app/core/store/services/store.service';
import { LoadingService } from 'src/app/global/services/loading.service';

@Component({
  selector: 'app-store-users',
  templateUrl: './store-users.component.html',
  styleUrls: ['./store-users.component.css']
})
export class StoreUsersComponent {
  @Input() info!: AllStore
  private loading = inject(LoadingService)
  private services = inject(StoreService)

  store_user: any
  ngOnInit(): void {
    setTimeout(() => {
      this.getStoreUsers()
    }, 2500)
  }

  getStoreUsers() {
    this.services.getMyStoreUsers(this.info?.id).then((result) => {
      this.store_user = result
    }).catch((err) => {
    });
  }
}
