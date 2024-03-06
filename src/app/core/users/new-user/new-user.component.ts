import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';
import { StoreService } from '../../store/services/store.service';
import { MyStoreParams } from '../../store/interfaces/store';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {
  private userServices = inject(UsersService)
  private storeServices = inject(StoreService)
  private snack = inject(SnackbarService)
  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    identification: new FormControl('', [Validators.required, Validators.max(11)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    store: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    groups_permission: new FormControl('', [Validators.required]),
  })
  store_arr: any[] = []

  ngOnInit(): void {
    this.getStoresAllUsers()
  }
  onSubmit() {

    this.userServices.postUsers(this.userForm.value).then((result) => {
      this.snack.openSnackBar("Usuario registrado con exito")
    }).catch((error) => {
      this.snack.openSnackBar(error.statusText)
    })
  }
  getStoresAllUsers() {
    const params = new MyStoreParams()
    params.parent = 'true'
    this.storeServices.getUserStores(params).then((result) => {
      this.store_arr = result
    }).catch((error) => {
      this.snack.openSnackBar(error.error.message)
    })
  }
}
