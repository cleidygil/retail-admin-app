import { Component, Inject, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AllStore, MyStoreParams } from 'src/app/core/store/interfaces/store';
import { StoreService } from 'src/app/core/store/services/store.service';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-transfer-product',
  templateUrl: './transfer-product.component.html',
  styleUrls: ['./transfer-product.component.css']
})
export class TransferProductComponent {
  private storeServices = inject(StoreService)
  private services = inject(InventoryService)
  mystores: AllStore[] = []
  mybranch: AllStore[] = []
  form = new FormGroup({
    available: new FormControl(''),
    quantity: new FormControl('', [Validators.required]),
    store: new FormControl('', [Validators.required]),
    option: new FormControl('', [Validators.required]),
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
      "store": valor.store,
      "product": this.data.item.product,
      "quantity": Number(valor.quantity),
      "inventory_type": this.data.type
    }
    this.services.patchInventoryTransaction(body).then((value) => {
      this.dialogRef.close(true)
    }).catch((error) => {
      console.log(error)
    })
  }
}
