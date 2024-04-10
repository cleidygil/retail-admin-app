import { Component, inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ParamsGlobal } from 'src/app/core/supplies/interfaces/supplies';
import { LoadingService } from 'src/app/global/services/loading.service';
import { ManageService } from '../../services/manege.service';
import { Management } from '../../interface/manege.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-taxes',
  templateUrl: './taxes.component.html',
  styleUrls: ['./taxes.component.css']
})
export class TaxesComponent {
  taxes: any[] = []
  private services = inject(ManageService)
  private loading = inject(LoadingService);
  private router = inject(Router)

  nextPage: number = 1;
  count: number = 1
  ngOnInit(): void {
    this.getTaxes()
  }

  getTaxes() {
    this.loading.showLoading()
    const params: Management = new Management()
    // params.page = this.nextPage
    params.status = 'true'
    this.services.getTaxes(params).then((result) => {
      this.loading.hideLoading()
      this.taxes = result
    }).catch((err) => {
      this.loading.hideLoading()
    });
  }
  nextPageIndex(event: PageEvent) {
    this.nextPage = event.pageIndex + 1;
    this.getTaxes()
  }
  editTaxes(id:any){
    this.router.navigate(["/home/management/taxes/"+id]);
  }
}
