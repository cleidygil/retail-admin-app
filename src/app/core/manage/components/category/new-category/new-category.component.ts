import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AllStore, MyStoreParams } from 'src/app/core/store/interfaces/store';
import { StoreService } from 'src/app/core/store/services/store.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';
import { ManageService } from '../../../services/manege.service';
import { Categories, Category, Management } from '../../../interface/manege.interface';
import { GlobalService } from 'src/app/global/services/global.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/global/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent {
  private services = inject(ManageService)
  private snack = inject(SnackbarService)
  private activateRou = inject(ActivatedRoute);
  private router = inject(Router)
  private global = inject(GlobalService)
  private dialog = inject(MatDialog)
  user: any = this.global.User()
  store: number = this.user.main
  sub!: Subscription
  id: number | null = null
  myFiles: any[] = [];
  format: any = [];
  accept: string = '.jpg,.png';
  files = new FormGroup({
    file: new FormControl(''),
    url: new FormControl(''),
  })
  image: string = ''
  mystores: AllStore[] = []
  subcategories: Category[] = []
  typeCategories = this.services.typeCategories.value
  constructor() {
    if (this.services.typeCategories.value == 0) {
      this.router.navigate(['/home/management/categories'])
      return
    }
    this.sub = this.activateRou.params.subscribe((data) => {
      this.id = Number(data['id']) || null
    })
  }
  categform = new FormGroup({
    'name': new FormControl('', [Validators.required]),
    'description': new FormControl('', [Validators.required]),
    // 'store': new FormControl('', [Validators.required])
  })
  // Sub categoria
  viewListSubCatf: boolean = false
  viewFormSubCatf: boolean = false
  subCategArr: any = []
  subcategform = new FormGroup({
    'name': new FormControl('', [Validators.required]),
    // 'description': new FormControl('', [Validators.required]),
    // 'store': new FormControl('', [Validators.required])
  })
  filesSub = new FormGroup({
    file: new FormControl(''),
    url: new FormControl(''),
  })
  myFilesSub: any[] = [];
  formatSub: any = [];
  acceptSub: string = '.jpg,.png';
  imageSub: string = ''
  valueSubCat: string = 'new'
  idSubcat: number = 0
  ngOnInit(): void {

    if (this.id != null) {
      this.getCategoryID()
      this.getSubCategories()
    }

  }
  AddSubCateg() {
    if (this.filesSub.value.file == '') {
      return this.snack.openSnackBar("Por favor agregar la imagen a la categoria")
    }
    let sendImag = '';
    if (this.filesSub.value.file != '') {
      sendImag = this.myFilesSub[0].imageData
    }
    this.subCategArr.push({
      ...this.subcategform.value,
      "image": sendImag,
      store: this.services.user.principal_store,
      type: this.typeCategories,
      description: '',
    })
    this.subcategform.reset()
    this.formatSub = []
    this.myFilesSub = []
    this.filesSub.reset()
  }
  deleteSub(i: number) {
    this.subCategArr = this.subCategArr.filter((item: any, index: number) => index != i).map((item: any) => item)
  }
  deleteCategory(i: number) {
    const dialogo = this.dialog.open(ConfirmDialogComponent, {
      data: { message: "¿Seguro que quieres eliminar este ítems?" }
    })
    dialogo.afterClosed().subscribe(data => {
      if (data) {
        this.services.deletehCategoryID(i).then((value) => {
          this.snack.openSnackBar("Items eliminadao con exito.")
          this.getSubCategories()
        }).catch((error) => {
          this.snack.openSnackBar(error.errror.message)
        })

      }
    })
  }
  onSubmit() {
    const valor = this.categform.value
    if (this.files.value.file == '' && this.files.value.url == '') {
      return this.snack.openSnackBar("Por favor agregar la imagen a la categoria o una URL de la imagen.")
    }
    let sendImag;
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
      "parent": this.typeCategories != 3 ? this.subCategArr : null,
      "image": sendImag,
      store: this.services.user.principal_store,
      type: this.typeCategories,
      description: valor.description
    }
    let body2 = { ...valor, ...body }
    if (this.id != null) {
      this.services.patchCategoryID(body2, Number(this.id)).then((res) => {
        this.snack.openSnackBar("Categoria actualizado exitosamente");
        this.router.navigate(['/home/management/categories/recipe_categories'])
        this.getCategoryID()
      }).catch((error) => {
        this.snack.openSnackBar("Ocurrio un error, por favor intente nuevamente")
      })
      return
    }
    this.services.postCategory(body2).then((res) => {
      this.snack.openSnackBar("Categoria registrado exitosamente");
      this.router.navigate(['/home/management/categories'])


    }).catch((error) => {
      this.snack.openSnackBar("Ocurrio un error, por favor intente nuevamente")

    })
    return

  }
  getCategoryID() {
    this.services.getCategoryID(Number(this.id)).then((result) => {
      setTimeout(() => {
        this.categform.patchValue({
          name: result.name,
          description: result?.description,
        })
        this.image = result.image
        this.files.patchValue({
          url: result.image
        })

      }, 2500)
    }).catch((error) => {
      this.snack.openSnackBar("Ocurrio un error! Por favor vuelva a intentarlo")
    })
  }

  seleccionarArchivo(event: any) {
    const file = event.target.files[0];
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
  getSubCategories() {

    const params: Management = new Management()
    params.parent = this.id?.toString()
    this.services.getCategories(params).then((result) => {
      this.subcategories = result.results
    }).catch((error) => {
      console.log(error)
    })
  }
  onSubmitSubCategory() {
    const valor = this.subcategform.value
    if (this.filesSub.value.file == '') {
      return this.snack.openSnackBar("Por favor agregar la imagen a la categoria o una URL de la imagen.")
    }
    let sendImag;
    if (this.filesSub.value.file != '') {
      sendImag = this.myFilesSub[0].imageData
    }
    if (this.id != null && this.filesSub.value.file == '') {
      sendImag = this.image
    }
    let body = {
      "parent": this.id,
      "image": sendImag,
      store: this.services.user.principal_store,
      type: this.typeCategories
    }
    let body2 = { ...valor, ...body }

    this.services.postCategory(body2).then((res) => {
      this.snack.openSnackBar("Sub-categoria registrado exitosamente");
      this.getSubCategories()
      this.subcategform.reset()
      this.formatSub = []
      this.myFilesSub = []
      this.filesSub.reset()
    }).catch((error) => {
      this.snack.openSnackBar("Ocurrio un error, por favor intente nuevamente")
    })
    return
  }
  seleccionarArchivoSub(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = reader.result as string;
      const isImageType = file.type.startsWith('image/');
      if (isImageType) {
        this.myFilesSub = [{ name: file.name, imageData: result, preview: result }];
      } else {
        this.myFilesSub = [{ name: file.name, imageData: result, preview: null }];
      }
      const files = this.myFilesSub.map((file) => {
        return {
          name: file.name,
          image_data: file.imageData
        }
      })
      this.formatSub = files
    };
    reader.readAsDataURL(file);
  }
  resetFileSUb(indice: number): void {
    this.myFilesSub = this.myFilesSub.filter(
      (fil: string, i: number) => i !== indice
    );
    this.formatSub = this.formatSub.filter((fil: string, i: number) => i !== indice);
  }
  editsubcategory(elements: any) {
    this.viewFormSubCatf = true
    this.valueSubCat = 'edit'
    this.idSubcat = Number(elements.id)
    this.subcategform.patchValue({
      name: elements.name,
    })
    this.imageSub = elements.image
    this.filesSub.patchValue({
      url: elements.image
    })

  }
}
