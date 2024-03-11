import { Component, inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { LoadingService } from 'src/app/global/services/loading.service';
import { Management } from '../../interface/manege.interface';
import { ManageService } from '../../services/manege.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  categories: any[] = []
  private services = inject(ManageService)
  private loading = inject(LoadingService);
  private activateRou = inject(ActivatedRoute);
  private router = inject(Router)

  sub!: Subscription
  store: number | null = null
  nextPage: number = 1;
  count: number = 1
  constructor() {
    this.sub = this.activateRou.params.subscribe(data => {
      this.store = data['store']
      console.log(this.store, 'store categ')
    })
  }
  ngOnInit(): void {
    this.getCategories()
  }

  getCategories() {
    this.loading.showLoading()
    const params: Management = new Management()
    params.page = this.nextPage
    params.category = 'true'
    params.store = this.store?.toString()
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
