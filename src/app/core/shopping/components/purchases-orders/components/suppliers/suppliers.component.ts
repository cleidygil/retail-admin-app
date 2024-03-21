import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Management } from 'src/app/core/manage/interface/manege.interface';
import { ManageService } from 'src/app/core/manage/services/manege.service';
import { GlobalService } from 'src/app/global/services/global.service';
import { LoadingService } from 'src/app/global/services/loading.service';
import { DialogNewSuppliersComponent } from './dialog-new-suppliers/dialog-new-suppliers.component';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent {
  private services = inject(ManageService)
  private loading = inject(LoadingService);
  private global = inject(GlobalService)
  private dialog = inject(MatDialog)
  nextPage: number = 1;
  count: number = 1
  suppliers: any[] = []
  user = this.global.User()
  ngOnInit(): void {
    this.getSuppliers()
  }

  getSuppliers() {
    this.loading.showLoading()
    const params: Management = new Management()
    params.page = this.nextPage
    params.store = this.user.store
    this.services.getSuppliers(params).then((result) => {
      this.loading.hideLoading()
      this.suppliers = result.results
      this.count = result.count
    }).catch((err) => {
      this.loading.hideLoading()
    });
  }

  nextPageIndex(event: PageEvent) {
    this.nextPage = event.pageIndex + 1;
    this.getSuppliers()
  }
  OpenSupplier() {
    const dialogo = this.dialog.open(DialogNewSuppliersComponent, {
      data: this.user.store,
      width: window.innerWidth > 638 ? '40%' : 'auto'
    })
    dialogo.afterClosed().subscribe(data => {
      if (data) {
        this.getSuppliers()
      }
    })

  }
}
