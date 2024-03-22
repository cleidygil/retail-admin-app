import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/core/manage/interface/manege.interface';
import { ManageService } from 'src/app/core/manage/services/manege.service';
import { AllStore, MyStoreParams } from 'src/app/core/store/interfaces/store';
import { StoreService } from 'src/app/core/store/services/store.service';
import { MeasurementUnit, ParamsGlobal } from 'src/app/core/supplies/interfaces/supplies';
import { SuppliesService } from 'src/app/core/supplies/services/supplies.service';
import { GlobalService } from 'src/app/global/services/global.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';

@Component({
  selector: 'app-dialog-new-product',
  templateUrl: './dialog-new-product.component.html',
  styleUrls: ['./dialog-new-product.component.css']
})
export class DialogNewProductComponent {
  private services = inject(SuppliesService)
  private manage = inject(ManageService)
  private storeServices = inject(StoreService)
  private snack = inject(SnackbarService)
  private global = inject(GlobalService)
  private router = inject(Router)
  private activateRou = inject(ActivatedRoute); selectedFile: any = null;
  myFiles: any[] = [];
  format: any = [];
  accept: string = '.jpg,.png';
  archivoSeleccionado!: File;
  files = new FormGroup({
    file: new FormControl(''),
    url: new FormControl(''),
  })
  user = this.global.User()
  categories: any[] = []
  subcategories: any[] = []
  munits: MeasurementUnit[] = []
  brands: Brand[] = []
  mystores: AllStore[] = []
  mybranch: AllStore[] = []
  productSale = new FormGroup({
    'name': new FormControl('', [Validators.required]),
    'unidadmedida': new FormControl<any>('', [Validators.required]),
    'category': new FormControl<any>('', [Validators.required]),
    'subcategory': new FormControl<any>('', [Validators.required]),
    'brand': new FormControl<any>('', [Validators.required]),
  })
  image: string = ''
  constructor(
    public dialogRef: MatDialogRef<DialogNewProductComponent>
  ) { }
  ngOnInit(): void {
    this.getAllStore()
    this.getAllBranch()
    this.getBrands()
    this.getMU()
    this.getCategories()
  }
  getMU() {
    const params: ParamsGlobal = new ParamsGlobal()
    params.remove_pagination = 'true'
    this.services.getMeasurementUnits(params).then((result) => {
      this.munits = result
    }).catch((error) => {
      console.log(error)
    })
  }
  getBrands() {
    const params: ParamsGlobal = new ParamsGlobal()
    params.remove_pagination = 'true'
    this.manage.getBrands(params).then((result) => {
      this.brands = result
    }).catch((error) => {
      console.log(error)
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
  getCategories() {
    const params: ParamsGlobal = new ParamsGlobal()
    params.category = 'true'
    this.services.getCategories(params).then((result) => {
      this.categories = result.results
    }).catch((error) => {
      console.log(error)
    })
  }
  getSubCategories() {
    const params: ParamsGlobal = new ParamsGlobal()
    params.parent = this.productSale.value.category
    this.services.getCategories(params).then((result) => {
      this.subcategories = result.results
    }).catch((error) => {
      console.log(error)
    })
  }

  onSubmit() {
    if (this.files.value.file == '' && this.files.value.url == '') {
      return this.snack.openSnackBar("Por favor agregar la imagen al producto o una URL de la imagen.")
    }
    const valor = this.productSale.value

    let body = {
      "name": valor?.name,
      "description": valor?.name,
      "authorization": true,
      "image": this.files.value.url || this.files.value.file,
      "mu": valor?.unidadmedida,
      "brand": valor?.brand,
      "subcategory": valor?.subcategory,
      "store": this.user.store,
    }
    this.services.postProduts(body).then((res) => {
      this.snack.openSnackBar("Producto creado exitosamente");
      this.dialogRef.close(true)
    }).catch((error) => {
      this.snack.openSnackBar("Ocurrio un error, por favor intente nuevamente")
    })
  }
  seleccionarArchivo(event: any) {
    const file = event.target.files[0];
    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = reader.result as string;
      const dataUrl = event.target?.result as string
      const isImageType = file.type.startsWith('image/');
      let imageUrl: any
      if (isImageType) {
        //  imageUrl = this.convertirBase64AUrl(dataUrl);
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
