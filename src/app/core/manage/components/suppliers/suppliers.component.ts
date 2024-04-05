import { Component, inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { LoadingService } from 'src/app/global/services/loading.service';
import { Management } from '../../interface/manege.interface';
import { ManageService } from '../../services/manege.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent {
  private services = inject(ManageService)
  private loading = inject(LoadingService);

  nextPage: number = 1;
  count: number = 1
  suppliers:any[] =[] 
  ngOnInit(): void {
    this.getMeasurement()
  }

  getMeasurement() {
    this.loading.showLoading()
    const params:Management = new Management()
    params.page = this.nextPage
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
    this.getMeasurement()
  }
}
