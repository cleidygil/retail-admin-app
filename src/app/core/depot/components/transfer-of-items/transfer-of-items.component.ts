import { Component, inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { AllStore, MyStoreParams } from 'src/app/core/store/interfaces/store';
import { StoreService } from 'src/app/core/store/services/store.service';
import { GlobalService } from 'src/app/global/services/global.service';
import { Warehouse, Depot } from '../../interfaces/depot';
import { DepotService } from '../../services/depot.service';
import { DialogProductDistributionComponent } from '../warehouses/dialog-product-distribution/dialog-product-distribution.component';
import { TransferProductComponent } from 'src/app/core/inventory/components/transfer-product/transfer-product.component';

@Component({
  selector: 'app-transfer-of-items',
  templateUrl: './transfer-of-items.component.html',
  styleUrls: ['./transfer-of-items.component.css']
})
export class TransferOfItemsComponent {
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
    const dialogo = this.dialog.open(TransferProductComponent, {
      data: {item, type:2},
      width: window.innerWidth > 430 ? '40%' : 'auto'
    })
    dialogo.afterClosed().subscribe(data => {
      if (data) {
        this.getAllWarehouse()
      }
    })
  }
}
