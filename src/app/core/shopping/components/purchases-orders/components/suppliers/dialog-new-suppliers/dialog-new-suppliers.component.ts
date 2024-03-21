import { Component, Inject, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ManageService } from 'src/app/core/manage/services/manege.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';

@Component({
  selector: 'app-dialog-new-suppliers',
  templateUrl: './dialog-new-suppliers.component.html',
  styleUrls: ['./dialog-new-suppliers.component.css']
})
export class DialogNewSuppliersComponent {
  private services = inject(ManageService)
  private snack = inject(SnackbarService)
  image: string = ''
  supplierform = new FormGroup({
    'rif': new FormControl('', [Validators.required, Validators.max(10)]),
    'name': new FormControl('', [Validators.required]),
    'address': new FormControl('', [Validators.required]),
    'observation': new FormControl('', [Validators.required]),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'store': new FormControl('', )
  })
  constructor(
    public dialogRef: MatDialogRef<DialogNewSuppliersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
  ) { }


  onSubmit() {
    const valor = this.supplierform.value
    let body = {
      "name": valor.name,
      "rif": valor.rif,
      "address": valor.address,
      "email": valor.email,
      "observation": valor.observation,
      "image": '...',
      "store": this.data,
    }

    this.services.setSuppliers(body).then((res) => {
      this.snack.openSnackBar("Proveedor registrado exitosamente");
      this.dialogRef.close(true)
    }).catch((error) => {
      this.snack.openSnackBar("Ocurrio un error, por favor intente nuevamente")
    })

  }

}
