import { Component, inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from 'src/app/global/services/loading.service';
import { Ambient, Management, Table } from '../../interface/manege.interface';
import { ManageService } from '../../services/manege.service';

@Component({
  selector: 'app-manage-tables',
  templateUrl: './manage-tables.component.html',
  styleUrls: ['./manage-tables.component.css']
})
export class ManageTablesComponent {
  private services = inject(ManageService)
  private loading = inject(LoadingService);
  private activateRou = inject(ActivatedRoute);
  private router = inject(Router)

  nextPage: number = 1;
  count: number = 1
  tables: Table[] = []
  ngOnInit(): void {
    this.getTables()
  }

  getTables() {
    this.loading.showLoading()
    const params: Management = new Management()
    params.page = this.nextPage
    // params.store = this.services.user.principal_store

    this.services.getTables(params).then((result) => {
      this.loading.hideLoading()
      this.tables = result.results
      this.count = result.count
    }).catch((err) => {
      this.loading.hideLoading()
    });
  }
  nextPageIndex(event: PageEvent) {
    this.nextPage = event.pageIndex + 1;
    this.getTables()
  }
}
