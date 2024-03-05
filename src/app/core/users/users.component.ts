import { Component, inject } from '@angular/core';
import { GlobalService } from 'src/app/global/services/global.service';
import { UsersService } from './services/users.service';
import { LoadingService } from 'src/app/global/services/loading.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  private global = inject(GlobalService)
  private userServices = inject(UsersService)
  private loading = inject(LoadingService)
  private snack = inject(SnackbarService)
  user = this.global.User()
  listUsers: any[] = []
  ngOnInit(): void {
    this.getMyUsers()
  }
  getMyUsers() {
    this.loading.showLoading()
    this.userServices.getMyAccountStores(this.user.id).then((result) => {
      this.listUsers = result
      this.loading.hideLoading()
    }).catch((error) => {
      this.loading.hideLoading()
      this.snack.openSnackBar(error.error.message)
    })
  }
}
