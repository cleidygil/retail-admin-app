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
  accept: string = '.jpg,.png';

  brandsform = new FormGroup({
    name: new FormControl('', [Validators.required]),
  })
  file = new FormControl('');
  selectedFile: any = null;
  myFiles: any[] = [];
  format: any = [];

  archivoSeleccionado!: File;
  mostrar !: any
  ngOnInit(): void {
    if (this.data != '') {
      this.brandsform.patchValue({
        name: this.data.name,
      })
    }
  }
  seleccionarArchivo(event: any) {
    const file = event.target.files[0];
    this.selectedFile = file;
    console.log(this.selectedFile.name)

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const isImageType = file.type.startsWith('image/');

      if (isImageType) {
        this.myFiles = [{ name: file.name, imageData: result, preview: result }];
      } else {
        this.myFiles = [{ name: file.name, imageData: result, preview: null }];
      }

      const files = this.myFiles.map((file) => {
        return {
          name: file.name,
          image_data: file.imageData
        }
      })

      this.format = files
    };
    reader.readAsDataURL(file);
  }
  resetFile(indice: number): void {
    this.format = this.format.filter((fil: string, i: number) => i !== indice);
    this.myFiles = this.myFiles.filter(
      (fil: string, i: number) => i !== indice
    );
  }
  onSubmit() {
    const form = this.brandsform.value
    let body = {
      name: form.name,
      image: this.selectedFile.name
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
