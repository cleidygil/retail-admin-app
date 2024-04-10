import { Component, inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from 'src/app/global/services/loading.service';
import { Ambient, Management, Table } from '../../../interface/manege.interface';
import { ManageService } from '../../../services/manege.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AllStore, MyStoreParams } from 'src/app/core/store/interfaces/store';
import { StoreService } from 'src/app/core/store/services/store.service';
import { SnackbarService } from 'src/app/global/services/snackbar.service';
import { ConfirmDialogComponent } from 'src/app/global/components/confirm-dialog/confirm-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-manage-tables',
  templateUrl: './new-manage-tables.component.html',
  styleUrls: ['./new-manage-tables.component.css']
})
export class NewManageTablesComponent {
  private services = inject(ManageService)
  private storeServices = inject(StoreService)
  private loading = inject(LoadingService)
  private router = inject(Router)
  private snack = inject(SnackbarService)
  private dialog = inject(MatDialog)
  private activateRou = inject(ActivatedRoute);

  mystores: AllStore[] = []
  mybranch: AllStore[] = []
  tablesArr: any[] = []
  tablesForm = new FormGroup({
    'ambients': new FormControl('', [Validators.required, Validators.maxLength(200)]),
    'number': new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
    'description': new FormControl(''),
    'store': new FormControl<any>('', [Validators.required]),
  })
  nextPage: number = 1;
  count: number = 1
  tables: Table[] = []
  ambients: Ambient[] = []
  sub!: Subscription
  id: number | null = null
  store: number | null = null

  constructor(){
    this.sub = this.activateRou.params.subscribe((data) => {
      this.id = Number(data['id']) || null
      this.store = Number(data['store']) || null
    })
  }
  ngOnInit(): void {
    this.getAllStore()
    this.getAllBranch()
    if(this.id!=null){
      this.GetAmbientsID()
      this.tablesForm.disable()
    }
  }

  getTables() {
    this.loading.showLoading()
    const params: Management = new Management()
    params.page = this.nextPage
    params.store = this.tablesForm.value.store || ''
    this.services.getTables(params).then((result) => {
      this.loading.hideLoading()
      this.tables = result.results
      this.count = result.count
    }).catch((err) => {
      this.loading.hideLoading()
    });
  }

  getAmbients(id:any=0, tables:boolean=false) {
    const params: Management = new Management()
    params.store = id ==0 ? "":id
    params.tables=tables
    this.services.getAmbients(params).then((result) => {
      this.ambients = result.results
      this.count = result.count
    }).catch((err) => {
    });
  }
  GetAmbientsID(){
    this.services.getAmbientsID(this.id).then((result) => {
      this.tablesForm.patchValue({
        ambients:result.id,
        store:result.store.id,
        number: result.tables_count
      })
      this.getAmbients(result.store.id, true)

    }).catch((err) => {
    });
  }


  nextPageIndex(event: PageEvent) {
    this.nextPage = event.pageIndex + 1;
    this.getTables()
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

  onSubmit() {
    this.tablesForm.patchValue({
      description: this.tablesForm.value.number
    })
    const data ={
      number: Number(this.tablesForm.value.number),
      store: this.tablesForm.value.store,
      ambient:Number(this.tablesForm.value.ambients)
    }
    this.services.postTables(data).then((result) => {
      this.router.navigate(['home/management/manage_tables'])
      this.snack.openSnackBar("Mesas creado con exito!")
    }).catch((error) => {
      this.snack.openSnackBar("Ocurrio un error, intente de nuevo!")
    })
  }

}
