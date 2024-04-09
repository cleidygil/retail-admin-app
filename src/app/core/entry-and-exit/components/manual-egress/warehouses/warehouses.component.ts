import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DepotService } from 'src/app/core/depot/services/depot.service';
import { AllStore, MyStoreParams } from 'src/app/core/store/interfaces/store';
import { StoreService } from 'src/app/core/store/services/store.service';
import { GlobalService } from 'src/app/global/services/global.service';
import { EntryAndExitService } from '../../../services/entry-and-exit.service';
import { PageEvent } from '@angular/material/paginator';
import { DialogProductDistributionComponent } from 'src/app/core/depot/components/warehouses/dialog-product-distribution/dialog-product-distribution.component';
import { Depot, Warehouse } from 'src/app/core/depot/interfaces/depot';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogProductEgressComponent } from '../dialog-product-egress/dialog-product-egress.component';
import { SnackbarService } from 'src/app/global/services/snackbar.service';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.css']
})
export class WarehousesComponent {
  private services = inject(EntryAndExitService)
  private depot = inject(DepotService)
  private dialog = inject(MatDialog)
  private snack = inject(SnackbarService)
  private router = inject(Router)
  store: number = 0;

  mybranch: AllStore[] = []
  params = new FormGroup({
    search: new FormControl(''),
  })
  nextPage: number = 1;
  count: number = 1
  warehouses: Warehouse[] = []
  selectionProducts: any[] = []
  ngOnInit(): void {
    this.services.idStore.value == 0 ? (this.router.navigate(['home/income_egress/egress/'])) : (this.store = this.services.idStore.value)
    this.getAllWarehouse()
  }

  getAllWarehouse() {
    const valor = this.params.value
    const params: Depot = new Depot()
    params.page = this.nextPage
    params.search = valor.search || ''
    params.store = this.services.idStore.value.toString()
    this.depot.getAllWarehouses(params).then((result) => {
      this.warehouses = result.results
      this.count = result.count
    }).catch((error) => {
      console.log(error)
    })
  }
  nextPageIndex(event: PageEvent) {
    this.nextPage = event.pageIndex + 1;
    this.getAllWarehouse()
  }
  openProductEgress(item: any) {
    const dialogo = this.dialog.open(DialogProductEgressComponent, {
      data: { item, type: null },
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
      }
    })
  }
  onSubmit() {
    this.services.postTrash(this.selectionProducts).then((value) => {
      this.getAllWarehouse()
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
