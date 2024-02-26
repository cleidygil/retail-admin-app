import { Component, inject } from '@angular/core';
import { AllStore, MyStoreParams } from '../../../interfaces/store';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LoadingService } from 'src/app/global/services/loading.service';
import { StoreService } from '../../../services/store.service';
import { DialogPaymentsMethodsComponent } from '../dialog-payments-methods/dialog-payments-methods.component';
import { DialogAddStoreComponent } from '../dialog-add-store/dialog-add-store.component';

@Component({
  selector: 'app-stores-all',
  templateUrl: './stores-all.component.html',
  styleUrls: ['./stores-all.component.css']
})
export class StoresAllComponent {
  private brandServices = inject(StoreService)
  private loading = inject(LoadingService);
  private dialog = inject(MatDialog)

  dataSource = new MatTableDataSource<AllStore>([]);
  displayedColumns: string[] = [
    'id',
    'rif',
    'name',
    'address',
    "currency",
    'payment',
    'action'
  ];
  nextPage: number = 1;
  count: number = 1
  params = new FormGroup({
    search: new FormControl(''),
    status: new FormControl('')
  })
  ngOnInit(): void {
    this.getAllStore()
  }

  getAllStore() {
    this.loading.showLoading()
    const params = new MyStoreParams()
    const valor = this.params.value;
    params.page = this.nextPage
    params.status = valor.status || ''
    params.search = valor.search || ''
    params.parent = 'false'

    this.brandServices.getMyStore(params).then((result) => {
      this.loading.hideLoading()
      this.dataSource = new MatTableDataSource(result.results)
      this.count = result.count
    }).catch((err) => {
      this.loading.hideLoading()
    });
  }
  nextPageIndex(event: PageEvent) {
    this.nextPage = event.pageIndex + 1;
    this.getAllStore()
  }
  openEdit(element: any) {
    let dialogRef = this.dialog.open(DialogAddStoreComponent, {
      width: window.innerWidth > 639 ? '40%' : '100%',
      data: element
    })
    dialogRef.afterClosed().subscribe((data: boolean) => {
      if (data) {
        this.getAllStore()      }
    })
  }
  openPaymentsMethods(element:any){
    let dialogRef = this.dialog.open(DialogPaymentsMethodsComponent, {
      width: window.innerWidth > 639 ? '40%' : '100%',
      data: element
    })
    dialogRef.afterClosed().subscribe((data: boolean) => {
      if (data) {
        this.getAllStore()      }
    })
  }
}
