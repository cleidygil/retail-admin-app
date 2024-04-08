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

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.css']
})
export class WarehousesComponent {
  private services = inject(EntryAndExitService)
  private depot = inject(DepotService)
  private dialog = inject(MatDialog)
  private global = inject(GlobalService)
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
    console.log(this.services.idStore.value)
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
