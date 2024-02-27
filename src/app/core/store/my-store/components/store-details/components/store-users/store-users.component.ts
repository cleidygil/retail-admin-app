import { Component, Input, inject } from '@angular/core';
import { AllStore, UserStore } from 'src/app/core/store/interfaces/store';
import { StoreService } from 'src/app/core/store/services/store.service';
import { LoadingService } from 'src/app/global/services/loading.service';
import { DialogStoreUserComponent } from '../../../dialog-store-user/dialog-store-user.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-store-users',
  templateUrl: './store-users.component.html',
  styleUrls: ['./store-users.component.css']
})
export class StoreUsersComponent {
  @Input() info!: AllStore
  private loading = inject(LoadingService)
  private services = inject(StoreService)
  private dialog = inject(MatDialog)
  store_user: UserStore[] = []
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
  openUser(element: any) {
    let dialogRef = this.dialog.open(DialogStoreUserComponent, {
      width: window.innerWidth > 639 ? '40%' : '100%',
      data: element
    })
    dialogRef.afterClosed().subscribe((data: boolean) => {
      if (data) {
        this.getStoreUsers()
      }
    })
  }
}
