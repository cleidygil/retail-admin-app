import { Component, inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { DepotService } from 'src/app/core/depot/services/depot.service';
import { AllStore, MyStoreParams } from 'src/app/core/store/interfaces/store';
import { StoreService } from 'src/app/core/store/services/store.service';
import { GlobalService } from 'src/app/global/services/global.service';
import { EntryAndExit } from '../../interfaces/entry-and-exit';
import { EntryAndExitService } from '../../services/entry-and-exit.service';
import { DialogDetailEntryExitComponent } from '../dialog-detail-entry-exit/dialog-detail-entry-exit.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.css']
})
export class WarehousesComponent {
  private storeServices = inject(StoreService)
  private services = inject(EntryAndExitService)
  private depot = inject(DepotService)
  private dialog = inject(MatDialog)
  private global = inject(GlobalService)
  private router = inject(Router)
  mystores: AllStore[] = []
  mybranch: AllStore[] = []
  dataTrash: any[] = []
  dataDepot: any[] = []
  nextPage: number = 1;
  count: number = 1
  params = new FormGroup({
    search: new FormControl(''),
    store: new FormControl(''),
    type: new FormControl(''),
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  })

  ngOnInit(): void {
    // this.geTrashOption()
    this.getAllStore()
    this.getAllBranch()
    this.params.valueChanges.subscribe(data => {
      if (data.type == 'false') {
        this.getDepotPurcahrseOrder()
        return
      }
      if (data.type == 'true') {
        this.geTrashOption()
        return
      }
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
  geTrashOption() {
    const valor = this.params.value
    const params: EntryAndExit = new EntryAndExit()
    params.page = this.nextPage
    params.store = valor.store || '',
      // params.depot_exit = valor.type || '';
      params.search = valor.search || ''

    if (valor.start != null && valor.end != null) {
      params.since = new Date(valor?.start).toLocaleDateString("fr-CA",);
      params.until = new Date(valor?.end).toLocaleDateString("fr-CA",)
    }
    this.services.getrash(params).then((result) => {
      this.dataTrash = result.results
      this.count = result.count
    }).catch((error) => {
      console.log(error)
    })
  }
  getDepotPurcahrseOrder() {
    const valor = this.params.value
    const params: EntryAndExit = new EntryAndExit()
    params.page = this.nextPage
    params.store = valor.store || '',
      params.depot__store = valor.store || '',
      // params.depot_exit = valor.type || '';
      params.search = valor.search || ''

    if (valor.start != null && valor.end != null) {
      params.since = new Date(valor?.start).toLocaleDateString("fr-CA",);
      params.until = new Date(valor?.end).toLocaleDateString("fr-CA",)
    }
    this.services.getDepotPurcahrseOrder(params).then((result) => {
      this.dataDepot = result.results
      this.count = result.count
    }).catch((error) => {
      console.log(error)
    })
  }
  nextPageIndex(event: PageEvent) {
    this.nextPage = event.pageIndex + 1;
    if (this.params.value.type == 'false') {
      this.getDepotPurcahrseOrder()
      return
    }
    if (this.params.value.type == 'true') {
      this.geTrashOption()
      return
    }
  }
  openDetail(item: any) {
    const dialogo = this.dialog.open(DialogDetailEntryExitComponent, {
      data: item,
      width: window.innerWidth > 720 ? '40%' : 'auto'
    })
    dialogo.afterClosed().subscribe(data => {
      if (data) {
        this.geTrashOption()
      }
    })
  }
}
