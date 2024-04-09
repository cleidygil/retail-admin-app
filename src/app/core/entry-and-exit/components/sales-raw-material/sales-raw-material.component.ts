import { Component, inject } from '@angular/core';
import { EntryAndExitService } from '../../services/entry-and-exit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { InventoryRes, Inventory } from 'src/app/core/inventory/interfaces/inventory';
import { InventoryService } from 'src/app/core/inventory/services/inventory.service';
import { DialogProductEgressComponent } from '../manual-egress/dialog-product-egress/dialog-product-egress.component';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/global/services/snackbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sales-raw-material',
  templateUrl: './sales-raw-material.component.html',
  styleUrls: ['./sales-raw-material.component.css']
})
export class SalesRawMaterialComponent {
  private services = inject(EntryAndExitService)
  private servicesInv = inject(InventoryService)
  private dialog = inject(MatDialog)
  private snack = inject(SnackbarService)
  private router = inject(Router)
  private activateRouter = inject(ActivatedRoute)
  id: number = 0
  sub!: Subscription
  store: number = 0;
  productsAll: InventoryRes[] = []
  selectionProducts: any[] = []
  nextPage: number = 1;
  count: number = 1
  params = new FormGroup({
    search: new FormControl(''),
  })
  constructor(){
    this.activateRouter.params.subscribe(data => {
      console.log(data['id'])
      this.id = data['id'] !== undefined ? Number(data['id']) : 0
    })
  }
  ngOnInit(): void {
    this.services.idStore.value == 0 ? (this.router.navigate(['home/income_egress/egress/'])) : (this.store = this.services.idStore.value)
    this.getAllProducts()
  }

  getAllProducts() {
    const valor = this.params.value
    const params: Inventory = new Inventory()
    params.type = this.id == 0 ? '':  this.id.toString();
    params.page = this.nextPage
    params.search = valor.search || ''
    params.store = this.store.toString() || '';
    this.servicesInv.getAllInventory(params).then((result) => {
      this.productsAll = result.results
      this.count = result.count
    }).catch((err) => {
      console.log(err)
      // this.loading.hideLoading()
    });
  }
  nextPageIndex(event: PageEvent) {
    this.nextPage = event.pageIndex + 1;
    this.getAllProducts()
  }
  openProductEgress(item: any) {
    const dialogo = this.dialog.open(DialogProductEgressComponent, {
      data: { item, type: this.id },
      width: window.innerWidth > 430 ? '40%' : 'auto'
    })
    dialogo.afterClosed().subscribe(data => {
      if (data) {
        this.selectionProducts.push(this.services.loadProduct.value)
        let prueba = this.selectionProducts.reduce((acc: any[], obj: any) => {
          let duplicado = acc.filter((it) => it.product === obj.product)
          if (duplicado.length > 0) {
            duplicado[0].quantity = obj.quantity
          } else {
            acc.push(obj);
          }
          return acc;
        }, []);
        this.selectionProducts = prueba.length > 0 ? prueba : this.selectionProducts
        console.log(this.selectionProducts)
      }
    })
  }
  onSubmit() {
    this.services.postTrash(this.selectionProducts).then((value) => {
      this.getAllProducts()
      this.selectionProducts = []
      this.snack.openSnackBar("La operacion se ha realizado con exito!")
    }).catch((error) => {
      console.log(error)
      if (error.status == 400) {
        this.snack.openSnackBar(error.error.message)
      }
    })
    return
  }
}
