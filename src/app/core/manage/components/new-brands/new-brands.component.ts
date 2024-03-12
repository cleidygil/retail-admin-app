import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AllStore, MyStoreParams } from 'src/app/core/store/interfaces/store';
import { StoreService } from 'src/app/core/store/services/store.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';
import { ManageService } from '../../services/manege.service';

@Component({
  selector: 'app-new-brands',
  templateUrl: './new-brands.component.html',
  styleUrls: ['./new-brands.component.css']
})
export class NewBrandsComponent {
  private services = inject(ManageService)
  private storeServices = inject(StoreService)
  private snack = inject(SnackbarService)
  private activateRou = inject(ActivatedRoute);
  private router = inject(Router)

  sub!: Subscription
  id: number | null = null
  selectedFile: any = null;
  myFiles: any[] = [];
  format: any = [];
  accept: string = '.jpg,.png';
  files = new FormGroup({
    file: new FormControl(''),
    url: new FormControl(''),
  })
  image: string = ''
  mystores: AllStore[] = []
  store: number | null = null
  brandsform = new FormGroup({
    name: new FormControl('', [Validators.required]),
    store: new FormControl<any>('', [Validators.required])
  })
  constructor() {
    this.sub = this.activateRou.params.subscribe((data) => {
      this.id = Number(data['id']) || null
      this.store = Number(data['store']) || null
    })
  }
  ngOnInit(): void {
    if (this.id != null) {
      this.getProductsID()
    }
    this.getAllStore()
  }

  getAllStore() {
    const params = new MyStoreParams()
    params.parent = 'true'
    this.storeServices.getUserStores(params).then((result) => {
      this.mystores = result
    }).catch((err) => {
      console.log(err)
    });
  }
  onSubmit() {
    if (this.files.value.file == '' && this.files.value.url == '') {
      return this.snack.openSnackBar("Por favor agregar la imagen al producto o una URL de la imagen.")
    }
    let sendImag;
    const valor = this.brandsform.value
    if (this.files.value.file != '') {
      sendImag = this.myFiles[0].imageData
    }
    if (this.files.value.url != '') {
      sendImag = this.files.value.url
    }
    if (this.id != null && this.files.value.file == '' && this.files.value.url == '') {
      sendImag = this.image
    }
    let body = {
      "name": valor.name,
      "image": sendImag,
      "store": valor.store,
    }
    this.services.setBrands(body).then((res) => {
      this.router.navigate(['../'])
      this.snack.openSnackBar("Marca creada exitosamente");
    }).catch((error) => {
      this.snack.openSnackBar("Ocurrio un error, por favor intente nuevamente")
    })
    // return
    // if (this.id != null) {
    //   this.services.patchBrandID(body, Number(this.id)).then((res) => {
    //     this.snack.openSnackBar("Marca actualizada exitosamente");
    //     this.router.navigate(['/home/management/brands'])
    //   }).catch((error) => {
    //     this.snack.openSnackBar("Ocurrio un error, por favor intente nuevamente")
    //   })
    //   return
    // }
  }
  getProductsID() {
    this.services.getBrandId(Number(this.id)).then((result) => {
      this.brandsform.patchValue({
        name: result.name,
        store: result.store.id

      })
      this.image = result.image
    }).catch((error) => {
      this.snack.openSnackBar("Ocurrio un error! Por favor vuelva a intentarlo")
    })
  }

  seleccionarArchivo(event: any) {
    const file = event.target.files[0];
    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = (event) => {
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
    this.myFiles = this.myFiles.filter(
      (fil: string, i: number) => i !== indice
    );
    this.format = this.format.filter((fil: string, i: number) => i !== indice);
  }
  convertirBase64AUrl(base64Data: string): string {
    console.log(base64Data)
    const byteCharacters = JSON.parse(window.atob(base64Data));
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/jpeg' });

    // Crear una URL a partir del blob
    const objectURL = URL.createObjectURL(blob);
    return objectURL;
  }
}
