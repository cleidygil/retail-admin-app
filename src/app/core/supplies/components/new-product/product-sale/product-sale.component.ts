import { Component, Input, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllStore, MyStoreParams } from 'src/app/core/store/interfaces/store';
import { StoreService } from 'src/app/core/store/services/store.service';
import { GlobalService } from 'src/app/global/services/global.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';
import { ParamsGlobal } from '../../../interfaces/supplies';
import { SuppliesService } from '../../../services/supplies.service';

@Component({
  selector: 'app-product-sale',
  templateUrl: './product-sale.component.html',
  styleUrls: ['./product-sale.component.css']
})
export class ProductSaleComponent {
  @Input() myFiles: any[] = []
  private services = inject(SuppliesService)
  private storeServices = inject(StoreService)
  private snack = inject(SnackbarService)
  private global = inject(GlobalService)
  private router = inject(Router)
  user = this.global.User()
  constructor() { }
  categories: any[] = []
  munits: any[] = []
  mystores: AllStore[] = []

  productSale = new FormGroup({
    'name': new FormControl('', [Validators.required]),
    'serial': new FormControl('', [Validators.required]),
    'um': new FormControl('', [Validators.required]),
    'category': new FormControl('', [Validators.required]),
    'impuesto': new FormControl('', [Validators.required]),
    'costSale': new FormControl('', [Validators.required]),
    'totalcostsale': new FormControl('', [Validators.required]),
    'store': new FormControl('', [Validators.required])
  })
  ngOnInit(): void {
    this.getAllStore()
    this.getCategories()
    this.getMU()
  }
  getMU() {
    const params: ParamsGlobal = new ParamsGlobal()
    params.remove_pagination = 'true'
    this.services.getMeasurementUnits(params).then((result) => {
      this.munits = result.results
    }).catch((error) => {
      console.log(error)
    })
  }
  getAllStore() {
    const params = new MyStoreParams()
     params.parent = 'true'
    this.storeServices.getUserStores(params).then((result) => {
      this.mystores =result
    }).catch((err) => {
      console.log(err)
    });
  }
  getCategories() {
    const params: ParamsGlobal = new ParamsGlobal()
    this.services.getCategories(params).then((result) => {
      this.categories = result.results
    }).catch((error) => {
      console.log(error)
    })
  }
 
  onSubmit() {
    if (this.myFiles.length == 0) {
      return this.snack.openSnackBar("Por favor agregar la imagen al producto.")
    }
    const valor = this.productSale.value
  
    let body = {
      "name": valor?.name,
      "description": valor?.name,
      "barcode": valor?.serial,
      "authorization": true,
      "image":this.myFiles[0].name,
      "mu": valor?.um,
      "price": valor?.costSale,
      "subcategory": valor?.category,
      "store": valor?.store,
    }
    this.services.postProduts(body).then((res) => {
      this.snack.openSnackBar("Producto creado exitosamente");
      this.router.navigate(['/home/supplies/products'])
    }).catch((error) => {
      this.snack.openSnackBar("Ocurrio un error, por favor intente nuevamente")
    })
  }
}
