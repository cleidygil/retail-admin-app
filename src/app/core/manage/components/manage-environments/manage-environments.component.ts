import { Component, inject } from '@angular/core';
import { Ambient, Management } from '../../interface/manege.interface';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from 'src/app/global/services/loading.service';
import { ManageService } from '../../services/manege.service';

@Component({
  selector: 'app-manage-environments',
  templateUrl: './manage-environments.component.html',
  styleUrls: ['./manage-environments.component.css']
})
export class ManageEnvironmentsComponent {
  private services = inject(ManageService)
  private loading = inject(LoadingService);
  private activateRou = inject(ActivatedRoute);
  private router = inject(Router)

  nextPage: number = 1;
  count: number = 1
  ambients: Ambient[] = []
  ngOnInit(): void {
    this.getAmbients()
  }

  getAmbients() {
    this.loading.showLoading()
    const params: Management = new Management()
    params.page = this.nextPage
    // params.store = this.services.user.principal_store

    this.services.getAmbients(params).then((result) => {
      this.loading.hideLoading()
      this.ambients = result.results
      this.count = result.count
    }).catch((err) => {
      this.loading.hideLoading()
    });
  }
  nextPageIndex(event: PageEvent) {
    this.nextPage = event.pageIndex + 1;
    this.getAmbients()
  }
}
