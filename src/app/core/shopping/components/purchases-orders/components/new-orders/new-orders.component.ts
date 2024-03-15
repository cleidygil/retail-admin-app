import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ManageService } from 'src/app/core/manage/services/manege.service';
import { AllStore, MyStoreParams } from 'src/app/core/store/interfaces/store';
import { StoreService } from 'src/app/core/store/services/store.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';
import { DialogSelectedProductsComponent } from '../dialog-selected-products/dialog-selected-products.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-new-orders',
  templateUrl: './new-orders.component.html',
  styleUrls: ['./new-orders.component.css']
})
export class NewOrdersComponent {
  private services = inject(ManageService)
  private storeServices = inject(StoreService)
  private activateRou = inject(ActivatedRoute);
  private dialog = inject(MatDialog)
  private snack = inject(SnackbarService)

  sub!: Subscription
  id: number | null = null

  image: string = ''
  mystores: AllStore[] = []
  supplierform = new FormGroup({
    'name': new FormControl('', [Validators.required]),
    'rif': new FormControl('', [Validators.required, Validators.max(10)]),
    'address': new FormControl('', [Validators.required]),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'store': new FormControl<any>('', [Validators.required]),
  })
  constructor() {
    this.sub = this.activateRou.params.subscribe((data) => {
      this.id = Number(data['id']) || null
    })
  }
  ngOnInit(): void {
    if (this.id != null) {
      this.getSupplierID()
    }
    this.getAllStore()
  }
  getSupplierID() {
    this.services.getSuppliersId(Number(this.id)).then((result) => {
      this.supplierform.patchValue({
        name: result.name,
        rif: result.rif,
        email: result.email,
        address: result.address,
      })
    }).catch((error) => {
      this.snack.openSnackBar("Ocurrio un error! Por favor vuelva a intentarlo")
    })
  }
  getAllStore() {
    const params = new MyStoreParams()
    params.parent = 'true'
    this.storeServices.getUserStores(params).then((result) => {
      this.mystores = result
    }).catch((err) => {
      console.log(err)
    });

  }
  onSubmit() {
  }
  addProduct() {
    const dialogo = this.dialog.open(DialogSelectedProductsComponent, {
      data: '',
      width: window.innerWidth > 432 ? '50%' :'auto',
      // height: '80%'
    })
  }
}
