import { Component, inject } from '@angular/core';
import { StoreService } from '../services/store.service';
import { LoadingService } from 'src/app/global/services/loading.service';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { BrandsParams } from '../interfaces/store';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogBrandsComponent } from './dialog-brands/dialog-brands.component';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent {
  private brandServices = inject(StoreService)
  private loading = inject(LoadingService);
  private dialog = inject(MatDialog)

  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [
    'id',
    'brands',
    'status',
    'action',
  ];
  nextPage: number = 1;
  count: number = 1
  params = new FormGroup({
    search: new FormControl(''),
    status: new FormControl('')
  })
  ngOnInit(): void {
    this.getBrands()
  }

  getBrands() {
    this.loading.showLoading()
    const params = new BrandsParams()
    const valor = this.params.value;
    params.page = this.nextPage
    params.status = valor.status || ''
    params.search = valor.search || ''

    this.brandServices.getBrands(params).then((result) => {
      this.loading.hideLoading()
      this.dataSource = new MatTableDataSource(result.results)
      this.count = result.count
    }).catch((err) => {
      this.loading.hideLoading()
    });
  }
  nextPageIndex(event: PageEvent) {
    this.nextPage = event.pageIndex + 1;
    this.getBrands()
  }
  openEdit(element: any) {
    let dialogRef = this.dialog.open(DialogBrandsComponent, {
      width: window.innerWidth > 639 ? '40%' : '100%',
      data: element
    })
  }
}
