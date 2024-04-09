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
  constructor(){

  }
  ngOnInit(): void {
    this.getTables()
    this.getAllStore()
    this.getAllBranch()
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

  getAmbients(id:any=0) {
    const params: Management = new Management()
    params.store = id ==0 ? "":id

    this.services.getAmbients(params).then((result) => {
      this.ambients = result.results
      this.count = result.count
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
    let lista=[]
    this.tablesForm.patchValue({
      description: this.tablesForm.value.number
    })
    lista.push({
      number: this.tablesForm.value.number,
      store: this.tablesForm.value.store,
      ambient:this.tablesForm.value.ambients
    })
    const data ={
      data:lista
    }
    this.services.postTables(data).then((result) => {
      this.router.navigate(['./manage_tables'])
      this.getTables()
      this.snack.openSnackBar("Mesas creado con exito!")
      this.tablesArr = []
    }).catch((error) => {
      this.snack.openSnackBar("Ocurrio un error, intente de nuevo!")
    })
  }
  delete(i: number) {
    const dialogo = this.dialog.open(ConfirmDialogComponent, {
      data: { message: "¿Seguro que quieres eliminar este ítems?" }
    })
    dialogo.afterClosed().subscribe(data => {
      if (data) {
        this.services.deletehAmbientID(i).then((value) => {
          this.snack.openSnackBar("Items eliminadao con exito.")
        }).catch((error) => {
          this.snack.openSnackBar(error.errror.message)
        })

      }
    })
  }
}
