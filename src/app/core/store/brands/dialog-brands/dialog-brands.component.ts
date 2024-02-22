import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StoreService } from '../../services/store.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';

@Component({
  selector: 'app-dialog-brands',
  templateUrl: './dialog-brands.component.html',
  styleUrls: ['./dialog-brands.component.css']
})
export class DialogBrandsComponent {
  private services = inject(StoreService)
  private snack = inject(SnackbarService)
  constructor(public dialogRef: MatDialogRef<DialogBrandsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  brandsform = new FormGroup({
    name: new FormControl('', [Validators.required]),
  })
  archivoSeleccionado!: File;
  mostrar !: any
  ngOnInit(): void {
    console.log(this.data)
    console.log(this.archivoSeleccionado)
    if (this.data != '') {
      this.brandsform.patchValue({
        name: this.data.name,
      })
    }
  }
  seleccionarArchivo(event: any) {
    console.log(event)
    this.archivoSeleccionado = event.target?.files[0];
    console.log(this.archivoSeleccionado, 'arch')
    let reader = new FileReader();
    reader.readAsDataURL(this.archivoSeleccionado);
    reader.onload = function () {
      console.log(reader.result)
      reader.result
      return
    }
    this.mostrar = reader.result?? ''
  }
  removeFile() {

  }
  onSubmit() {
    const form = this.brandsform.value
    let body = {
      name: form.name,
      image: this.mostrar
    }
    if (this.data != '') {
      this.services.patchBrandID(body, this.data.id).then((res) => {
        this.dialogRef.close(true)
        this.snack.openSnackBar("Actualizado exitosamente")
      }).catch((error) => {
        this.snack.openSnackBar(error.error.message)
      })
      return
    }
    this.services.setBrands(body).then((res) => {
      console.log(res, 'res')
      this.dialogRef.close(true)
      this.snack.openSnackBar("Agregado exitosamente")
    }).catch((error) => {
      this.snack.openSnackBar(error.error.message)
    })
    return
  }
}
