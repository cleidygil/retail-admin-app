import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ManageService } from 'src/app/core/manage/services/manege.service';
import { AllStore, MyStoreParams } from 'src/app/core/store/interfaces/store';
import { StoreService } from 'src/app/core/store/services/store.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';
import { DialogSelectedProductsComponent } from '../dialog-selected-products/dialog-selected-products.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationDialogComponent } from 'src/app/global/components/notification-dialog/notification-dialog.component';
import { ShoppingService } from 'src/app/core/shopping/services/shopping.service';
import { LoadingService } from 'src/app/global/services/loading.service';

@Component({
  selector: 'app-new-orders',
  templateUrl: './new-orders.component.html',
  styleUrls: ['./new-orders.component.css']
})
export class NewOrdersComponent {
  private services = inject(ManageService)
  private shopServices = inject(ShoppingService)
  private storeServices = inject(StoreService)
  private activateRou = inject(ActivatedRoute);
  private dialog = inject(MatDialog)
  private snack = inject(SnackbarService)
  private router = inject(Router)
  private loading = inject(LoadingService)
  sub!: Subscription
  id: number | null = null
  allProdutcts: any[] = []
  image: string = ''
  mystores: AllStore[] = []
  mybranch: AllStore[] = []
  supplierform = new FormGroup({
    'name': new FormControl({value:'', readonly:true},[Validators.required]),
    'rif': new FormControl({value:'', readonly:true}, [Validators.required, Validators.max(10)]),
    'address': new FormControl({value:'', readonly:true}, [Validators.required]),
    'email': new FormControl({value:'', readonly:true}, [Validators.required, Validators.email]),
    'store': new FormControl<any>('', [Validators.required]),
  })
  constructor() {
    this.sub = this.activateRou.params.subscribe((data) => {
      this.id = Number(data['id']) || null
    })
  }
  ngOnInit(): void {
    if (this.id != null) {
      this.getSupplierID()
    }
    this.getAllStore()
    this.getAllBranch()
  }
  getSupplierID() {
    this.services.getSuppliersId(Number(this.id)).then((result) => {
      this.supplierform.patchValue({
        name: result.name,
        rif: result.rif,
        email: result.email,
        address: result.address,
      })
    }).catch((error) => {
      this.snack.openSnackBar("Ocurrio un error! Por favor vuelva a intentarlo")
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
  onSubmit(status: number) {
    this.loading.showLoading()
    let valor = this.supplierform.value
    let body = {
      manual: 'false',
      store: valor.store,
      items: this.allProdutcts,
      supplier: this.id,
      status: status
    }

    this.shopServices.postPurchasesOrders(body).then((result) => {
      this.loading.hideLoading()
      this.services.productsArr.next([])
      const dialogo = this.dialog.open(NotificationDialogComponent, {
        data: ['Tu order ha sido creada con exito.', 'Hemos enviado un PDF de la orden de compra a tu email y al proveedor.'],
        width: window.innerWidth > 432 ? '30%' : 'auto',
        // height: '80%'
      })
      dialogo.afterClosed().subscribe(data => {
        if (data) {
          this.router.navigate(['./home/shopping/purchases_orders/orders'])
        }
      })
    }).catch((error) => {
      this.loading.hideLoading()
      this.snack.openSnackBar("Ocurrio un error, intente de nuevo!")
    })
  }
  addProduct() {
    const dialogo = this.dialog.open(DialogSelectedProductsComponent, {
      data: '',
      width: 'auto',
      // height: '80%'
    })
    dialogo.afterClosed().subscribe(data => {
      if (data) {
        let newDate: any[] = []
        this.services.productsArr.value?.map((product: any) => {
          let body = {
            product: product.product,
            name: product.name,
            cost: null,
            purchase_order: null,
            quantity: product.quantity
          }
          newDate.push(body)
        });
        let copias = [...this.allProdutcts, ...newDate]
        let prueba = copias.reduce((acc: any[], obj: any) => {
          let duplicado = acc.filter((it) => it.product === obj.product)
          if (duplicado.length > 0) {
            duplicado[0].quantity = obj.quantity
          } else {
            acc.push(obj);
          }
          return acc;
        }, []);
        this.allProdutcts = prueba.length > 0 ? prueba : this.allProdutcts
      }
    })
  }

  deleteProduct(id: number) {
    this.allProdutcts = this.allProdutcts.filter(item => item.product != id).map(item => item)
  }
}
