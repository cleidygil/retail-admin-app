import { Component, Inject, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AllStore, MyStoreParams } from 'src/app/core/store/interfaces/store';
import { StoreService } from 'src/app/core/store/services/store.service';
import { InventoryService } from '../../services/inventory.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';

@Component({
  selector: 'app-transfer-product',
  templateUrl: './transfer-product.component.html',
  styleUrls: ['./transfer-product.component.css']
})
export class TransferProductComponent {
  private storeServices = inject(StoreService)
  private services = inject(InventoryService)
  private snack = inject(SnackbarService)
  mystores: AllStore[] = []
  mybranch: AllStore[] = []
  form = new FormGroup({
    available: new FormControl(''),
    quantity: new FormControl('', [Validators.required, Validators.min(0)]),
    // type: new FormControl('', [Validators.required]),
    storetrans: new FormControl('', [Validators.required]),
  })
  constructor(
    public dialogRef: MatDialogRef<TransferProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { item: any, type: any },
  ) { }

  ngOnInit(): void {
    this.getAllBranch()
    this.getAllStore()
    this.form.patchValue({
      available: this.data.item.quantity
    })
  }
  getAllStore() {
    const params = new MyStoreParams()
    params.parent = 'false'
    this.storeServices.getUserStores(params).then((result) => {
      this.mystores = result
    }).catch((err) => {
      console.log(err)
    });
  }
  getAllBranch() {
    const params = new MyStoreParams()
    params.parent = 'true'
    this.storeServices.getUserStores(params).then((result) => {
      this.mybranch = result
    }).catch((err) => {
      console.log(err)
    });
  }
  onSubmit() {
    const valor = this.form.value
    let body = {
      store_receive: valor.storetrans,
      "product": this.data.item.product,
      "quantity": Number(valor.quantity),
    }
    this.services.postTransferProduct(body, this.data.item.store).then((value) => {
      this.dialogRef.close(true)
      this.snack.openSnackBar("Producto transferido con exito")
    }).catch((error) => {
      console.log(error)
    })
  }
}
