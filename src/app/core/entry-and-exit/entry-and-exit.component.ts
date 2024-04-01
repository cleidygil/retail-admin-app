import { Component, inject } from '@angular/core';
import { EntryAndExitService } from './services/entry-and-exit.service';
import { DialogDetailEntryExitComponent } from './components/dialog-detail-entry-exit/dialog-detail-entry-exit.component';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from 'src/app/global/services/global.service';
import { AllStore, MyStoreParams } from '../store/interfaces/store';
import { StoreService } from '../store/services/store.service';
import { EntryAndExit } from './interfaces/entry-and-exit';
import { FormGroup, FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { DepotService } from '../depot/services/depot.service';

@Component({
  selector: 'app-entry-and-exit',
  templateUrl: './entry-and-exit.component.html',
  styleUrls: ['./entry-and-exit.component.css']
})
export class EntryAndExitComponent {
  private storeServices = inject(StoreService)
  private services = inject(EntryAndExitService)
  private depot = inject(DepotService)
  private dialog = inject(MatDialog)
  private global = inject(GlobalService)

  mystores: AllStore[] = []
  mybranch: AllStore[] = []
  data: any[] = []
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
    this.getAllStore()
    this.getAllBranch()
    this.getEntryAndExit()
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
  getEntryAndExit() {
    const valor = this.params.value
    const params: EntryAndExit = new EntryAndExit()
    params.page = this.nextPage
    params.store = valor.store || '',
      params.type = valor.type || '';
    params.search = valor.search || ''
    // params.status = '4'
    // params.depot = 'false'
    if (valor.start != null && valor.end != null) {
      params.created_at_since = new Date(valor?.start).toLocaleDateString("fr-CA",);
      params.created_at_until = new Date(valor?.end).toLocaleDateString("fr-CA",)
    }
    this.depot.getAllWarehouses(params).then((result) => {
      this.data = result.results
      this.count = result.count
    }).catch((error) => {
      console.log(error)
    })
  }
  nextPageIndex(event: PageEvent) {
    this.nextPage = event.pageIndex + 1;
    this.getEntryAndExit()
  }
  openDetail(item: any) {
    const dialogo = this.dialog.open(DialogDetailEntryExitComponent, {
      data: item,
      width: window.innerWidth > 720 ? '40%' : 'auto'
    })
    dialogo.afterClosed().subscribe(data => {
      if (data) {
        this.getEntryAndExit()
      }
    })
  }
}