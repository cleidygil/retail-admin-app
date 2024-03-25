import { Component, Inject, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InventoryService } from '../../services/inventory.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';

@Component({
  selector: 'app-warehouse-return',
  templateUrl: './warehouse-return.component.html',
  styleUrls: ['./warehouse-return.component.css']
})
export class WarehouseReturnComponent {
  private services = inject(InventoryService)
  private sncak = inject(SnackbarService)
  form = new FormGroup({
    available: new FormControl(''),
    quantity: new FormControl('', [Validators.required]),
  })
  constructor(
    public dialogRef: MatDialogRef<WarehouseReturnComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { item: any, type: any },
  ) { }
  ngOnInit(): void {
    this.form.patchValue({
      available: this.data.item.quantity
    })
  }
  onSubmit() {
    const valor = this.form.value

    let body = {
      "store": this.data.item.store,
      "product": this.data.item.product,
      "quantity": Number(valor.quantity),
      "inventory_type": this.data.type
    }
    this.services.patchInventoryTransaction(body).then((value) => {
      this.dialogRef.close(true)
      this.sncak.openSnackBar("La operacion se ha realizado con exito!")
    }).catch((error) => {
      console.log(error)
      if (error.status == 400) {
        this.sncak.openSnackBar(error.error.message)
      }
    })
    return
  }
}
