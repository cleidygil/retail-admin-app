import { Component, inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from 'src/app/global/services/loading.service';
import { Management } from '../../../interface/manege.interface';
import { ManageService } from '../../../services/manege.service';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css']
})
export class ProductCategoriesComponent {
  categories: any[] = []
  private services = inject(ManageService)
  private loading = inject(LoadingService);
  private activateRou = inject(ActivatedRoute);
  private router = inject(Router)

  nextPage: number = 1;
  count: number = 1
  constructor() {
    this.services.typeCategories.next(1)
    }
  ngOnInit(): void {
    this.getCategories()
  }

  getCategories() {
    this.loading.showLoading()
    const params: Management = new Management()
    params.page = this.nextPage
    params.category = 'true'
    params.type ='1'
    params.store = this.services.user.principal_store

    this.services.getCategories(params).then((result) => {
      this.loading.hideLoading()
      this.categories = result.results
      this.count = result.count
    }).catch((err) => {
      this.loading.hideLoading()
    });
  }
  nextPageIndex(event: PageEvent) {
    this.nextPage = event.pageIndex + 1;
    this.getCategories()
  }

}
