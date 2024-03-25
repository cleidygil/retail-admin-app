import { Component, inject } from '@angular/core';
import { Depot, Warehouse } from '../../interfaces/depot';
import { DialogProductDistributionComponent } from './dialog-product-distribution/dialog-product-distribution.component';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ShoppingService } from 'src/app/core/shopping/services/shopping.service';
import { AllStore, MyStoreParams } from 'src/app/core/store/interfaces/store';
import { StoreService } from 'src/app/core/store/services/store.service';
import { GlobalService } from 'src/app/global/services/global.service';
import { DepotService } from '../../services/depot.service';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.css']
})
export class WarehousesComponent {
  private storeServices = inject(StoreService)
  private services = inject(DepotService)
  private dialog = inject(MatDialog)
  private global = inject(GlobalService)

  mybranch: AllStore[] = []
  params = new FormGroup({
    search: new FormControl(''),
    store: new FormControl(''),
  })
  nextPage: number = 1;
  count: number = 1
  warehouses: Warehouse[] = []
  ngOnInit(): void {
    this.getAllBranch()
    this.getAllWarehouse()
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


  getAllWarehouse() {
    const valor = this.params.value
    const params: Depot = new Depot()
    params.page = this.nextPage
    params.store = valor.store || ''
    this.services.getAllWarehouses(params).then((result) => {
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
  openChangeStatus(item: any) {
    const dialogo = this.dialog.open(DialogProductDistributionComponent, {
      data: item,
      width: window.innerWidth > 430 ? '40%' : 'auto'
    })
    dialogo.afterClosed().subscribe(data => {
      if (data) {
        this.getAllWarehouse()
      }
    })
  }
}
