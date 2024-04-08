import { Component, Inject, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InventoryService } from '../../services/inventory.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';
import { EntryAndExitService } from 'src/app/core/entry-and-exit/services/entry-and-exit.service';
import { Entry, EntryAndExit } from 'src/app/core/entry-and-exit/interfaces/entry-and-exit';

@Component({
  selector: 'app-warehouse-return',
  templateUrl: './warehouse-return.component.html',
  styleUrls: ['./warehouse-return.component.css']
})
export class WarehouseReturnComponent {
  private services = inject(InventoryService)
  private entryserv = inject(EntryAndExitService)
  private sncak = inject(SnackbarService)
  options: any[] = []
  form = new FormGroup({
    available: new FormControl(''),
    option: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required, Validators.min(0)]),
  })
  constructor(
    public dialogRef: MatDialogRef<WarehouseReturnComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { item: any, type: any },
  ) { }
  ngOnInit(): void {
    this.form.patchValue({
      available: this.data.item.quantity
    })
    this.getOptions()
  }
  getOptions() {
    const params: EntryAndExit = new EntryAndExit()
    params.remove_pagination = 'true'
    this.entryserv.getOptionsInventory(params).then((value) => {
      this.options = value
    }).catch((error) => {
      console.log(error)
    })
  }
  onSubmit() {
    const valor = this.form.value

    let body = {
      "store": this.data.item.store,
      "product": this.data.item.product,
      "quantity": -Number(valor.quantity),
      "inventory_type": this.data.type,
      option: valor.option
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
