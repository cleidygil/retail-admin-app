import { Component, Inject, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-warehouse-return',
  templateUrl: './warehouse-return.component.html',
  styleUrls: ['./warehouse-return.component.css']
})
export class WarehouseReturnComponent {
  private services = inject(InventoryService)
  form = new FormGroup({
    available: new FormControl(''),
    quantity: new FormControl('', [Validators.required]),
  })
  constructor(
    public dialogRef: MatDialogRef<WarehouseReturnComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) { }
  onSubmit() {
    const valor = this.form.value
    let body = {
      "store": this.data.store,
      "product": this.data.item.product,
      "quantity": Number(valor.quantity),
      "inventory_type": 1
    }
    this.services.patchInventoryTransaction(body).then((value) => {
      this.dialogRef.close(true)
    }).catch((error) => {
      console.log(error)
    })
  }
}
