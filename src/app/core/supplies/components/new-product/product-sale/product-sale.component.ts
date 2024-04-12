import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AllStore, MyStoreParams } from 'src/app/core/store/interfaces/store';
import { StoreService } from 'src/app/core/store/services/store.service';
import { GlobalService } from 'src/app/global/services/global.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';
import { MeasurementUnit, ParamsGlobal, Tax } from '../../../interfaces/supplies';
import { SuppliesService } from '../../../services/supplies.service';
import { Subscription } from 'rxjs';
import { ManageService } from 'src/app/core/manage/services/manege.service';
import { Brand } from 'src/app/core/manage/interface/manege.interface';

@Component({
  selector: 'app-product-sale',
  templateUrl: './product-sale.component.html',
  styleUrls: ['./product-sale.component.css']
})
export class ProductSaleComponent {
  @Input() myFiles: any[] = []
  @Input() files: any
  @Output() image = new EventEmitter<string>()
  @Output() productForm =new EventEmitter<FormGroup>()
  private manage = inject(ManageService)
  private services = inject(SuppliesService)
  private storeServices = inject(StoreService)
  private snack = inject(SnackbarService)
  private global = inject(GlobalService)
  private router = inject(Router)
  private activateRou = inject(ActivatedRoute);
  sub!: Subscription
  id: number | null = null
  user = this.global.User()
  categories: any[] = []
  subcategories: any[] = []
  munits: MeasurementUnit[] = []
  mystores: AllStore[] = []
  mybranch: AllStore[] = []
  brands: Brand[] = []
  taxes:Tax[]=[]
  productSale = new FormGroup({
    'name': new FormControl('', [Validators.required]),
    'unidadmedida': new FormControl<any>('', [Validators.required]),
    'category': new FormControl<any>('', [Validators.required]),
    'subcategory': new FormControl<any>('', [Validators.required]),
    'store': new FormControl<any>('', [Validators.required]),
    'brand': new FormControl<any>('', [Validators.required]),
    impuesto: new FormControl<any>('', [Validators.required]),
  })
  constructor() {
    this.sub = this.activateRou.params.subscribe((data) => {
      this.id = Number(data['id']) || null
    })
  }
  ngOnInit(): void {
    this.getMU()
    this.getAllStore()
    this.getCategories()
    this.getBrands()
    this.getAllBranch()
    this.getTax()
    if (this.id != null) {
      this.productSale.disable()
      this.getProductsID()
    }
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
  getMU() {
    const params: ParamsGlobal = new ParamsGlobal()
    params.remove_pagination = 'true'
    this.services.getMeasurementUnits(params).then((result) => {
      this.munits = result
    }).catch((error) => {
      console.log(error)
    })
  }
  getTax() {
    const params: ParamsGlobal = new ParamsGlobal()
    params.remove_pagination = 'true'
    this.services.getAllTax().then((result) => {
      this.taxes = result
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
    if (this.files.file == '' && this.files.url == '') {
      return this.snack.openSnackBar("Por favor agregar la imagen al producto o una URL de la imagen.")
    }
    const valor = this.productSale.value

    let body = {
      "name": valor?.name,
      "description": valor?.name,
      "authorization": true,
      "image": this.files.url || this.files.file,
      "mu": valor?.unidadmedida,
      "brand": valor?.brand,
      "subcategory": valor?.subcategory,
      "store": valor?.store,
      "taxes": valor?.impuesto
    }
    this.services.postProduts(body).then((res) => {
      this.snack.openSnackBar("Producto creado exitosamente");
      this.router.navigate(['/home/supplies/products'])
    }).catch((error) => {
      this.snack.openSnackBar("Ocurrio un error, por favor intente nuevamente")
    })
  }
  getProductsID() {
    this.services.getProductID(Number(this.id)).then((result) => {
      this.productSale.patchValue({
        name: result.name,
        unidadmedida: result?.mu,
        category: result.subcategory.parent,
        subcategory: result.subcategory.id,
        store: result.store.id,
        // brand: result.brand,
      })
      this.getMU()
      this.image.emit(result.image)
      this.productForm.emit(this.productSale)
      this.getSubCategories()
    }).catch((error) => {
      this.snack.openSnackBar("Ocurrio un error! Por favor vuelva a intentarlo")
    })
  }
  Update() {
    const valor = this.productSale.value
    let image;
    let sendImag;
    this.image.subscribe(data => image = data)
    if (this.files.file == '' && this.files.url == '') {
      sendImag = image
    }
    if (this.files.file != '') {
      sendImag = this.myFiles[0].imageData
    }
    if (this.files.url != '') {
      sendImag = this.files.url
    }
    let body = {
      "name": valor?.name,
      "description": valor?.name,
      "authorization": true,
      "image": sendImag,
      "mu": valor?.unidadmedida,
      "brand": valor?.brand,
      "subcategory": valor?.subcategory,
      "store": valor?.store,
    }
    this.services.patchProduts(body, this.id).then((res) => {
      this.snack.openSnackBar("Producto actualizado exitosamente");
      this.router.navigate(['/home/supplies/products'])
    }).catch((error) => {
      this.snack.openSnackBar("Ocurrio un error, por favor intente nuevamente")
    })
  }

}
