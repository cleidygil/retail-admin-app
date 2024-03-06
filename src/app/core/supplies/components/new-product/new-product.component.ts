import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllStore, MethosdParams, MyStoreParams } from 'src/app/core/store/interfaces/store';
import { StoreService } from 'src/app/core/store/services/store.service';
import { GlobalService } from 'src/app/global/services/global.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';
import { SuppliesService } from '../../services/supplies.service';
import { ParamsGlobal } from '../../interfaces/supplies';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent {
  constructor() { }
  checked = new FormGroup({
    check: new FormControl<boolean>(false)
  })
  productNew = new FormGroup({
    name: new FormControl<any>('', [Validators.required]),
    barcode: new FormControl<any>('', [Validators.required]),
  })

  selectedFile: any = null;
  myFiles: any[] = [];
  format: any = [];
  accept: string = '.jpg,.png';
  archivoSeleccionado!: File;
  files = new FormGroup({
    file: new FormControl(''),
    url: new FormControl(''),
  })


  onSubmitProduct() {
    const valor = this.productNew.value
    let body = {
      name: valor?.name,
      barcode: valor?.barcode,
      authorization: this.checked.value.check
    }
    console.log(body)

  }


  seleccionarArchivo(event: any) {
    const file = event.target.files[0];
    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = reader.result as string;
      const dataUrl = event.target?.result as string
      const isImageType = file.type.startsWith('image/');
      let imageUrl:any
      if (isImageType) {
       imageUrl = this.convertirBase64AUrl(dataUrl);
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
    this.myFiles = this.myFiles.filter(
      (fil: string, i: number) => i !== indice
    );
    this.format = this.format.filter((fil: string, i: number) => i !== indice);
  }
  convertirBase64AUrl(base64Data: string):string {
    console.log(base64Data)
    const byteCharacters =  JSON.parse(window.atob(base64Data));
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/jpeg' });

    // Crear una URL a partir del blob
    const objectURL = URL.createObjectURL(blob);
    console.log(objectURL)
    return objectURL;
}
}
