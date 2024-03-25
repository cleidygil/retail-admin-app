import { Component, Inject, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepotService } from '../../../services/depot.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InventoryService } from 'src/app/core/inventory/services/inventory.service';

@Component({
  selector: 'app-dialog-product-distribution',
  templateUrl: './dialog-product-distribution.component.html',
  styleUrls: ['./dialog-product-distribution.component.css']
})
export class DialogProductDistributionComponent {
  private snack = inject(SnackbarService);
  private services = inject(InventoryService)
  form = new FormGroup({
    available: new FormControl(''),
    rawmaterial: new FormControl('', [Validators.required]),
    sales: new FormControl('', [Validators.required]),
  })

  ngOnInit(): void {
    this.form.patchValue({
      available: this.data.quantity
    })
  }
  constructor(
    public dialogRef: MatDialogRef<DialogProductDistributionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  onSubmit() {
    const valor = this.form.value
    if (valor.rawmaterial != '') {
      let material = {
        "store": this.data.store,
        "product": this.data.product,
        "quantity": Number(valor.rawmaterial),
        "inventory_type": 2
      }
      this.services.patchInventoryTransaction(material).then((value) => {
        this.snack.openSnackBar("Operacion realizada exitosamente")
        this.dialogRef.close(true)
      }).catch((error) => {
        console.log(error)
        this.snack.openSnackBar("Ocurrio un error, asegurese que los datos sean correctos!")
      })
    }
    if (valor.sales != '') {
      let material = {
        "store": this.data.store,
        "product": this.data.product,
        "quantity": Number(valor.sales),
        "inventory_type": 1
      }
      this.services.patchInventoryTransaction(material).then((value) => {
        this.snack.openSnackBar("Operacion realizada exitosamente")
        this.dialogRef.close(true)
      }).catch((error) => {
        console.log(error)
        this.snack.openSnackBar("Ocurrio un error, asegurese que los datos sean correctos!")
      })
    }
  }
}
