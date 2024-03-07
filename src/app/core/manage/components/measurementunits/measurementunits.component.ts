import { Component, inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { LoadingService } from 'src/app/global/services/loading.service';
import { ManageService } from '../../services/manege.service';
import { Management } from '../../interface/manege';

@Component({
  selector: 'app-measurementunits',
  templateUrl: './measurementunits.component.html',
  styleUrls: ['./measurementunits.component.css']
})
export class MeasurementunitsComponent {
  private services = inject(ManageService)
  private loading = inject(LoadingService);

  nextPage: number = 1;
  count: number = 1
  mu:any[] =[] 
  ngOnInit(): void {
    this.getMeasurement()
  }

  getMeasurement() {
    this.loading.showLoading()
    const params:Management = new Management()
    params.page = this.nextPage
 
    this.services.getMeasurementunits(params).then((result) => {
      this.loading.hideLoading()
      this.mu = result.results
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
