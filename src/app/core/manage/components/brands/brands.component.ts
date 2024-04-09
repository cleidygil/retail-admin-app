import { Component, inject } from '@angular/core';
import { ManageService } from '../../services/manege.service';
import { PageEvent } from '@angular/material/paginator';
import { LoadingService } from 'src/app/global/services/loading.service';
import { Brand, BrandsParams } from '../../interface/manege.interface';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent {
  private brandServices = inject(ManageService)
  private loading = inject(LoadingService);
  private router = inject(Router)
  private activateRou = inject(ActivatedRoute);
  store: number | null = null
  nextPage: number = 1;
  count: number = 1
  brands: Brand[] = []
  sub!: Subscription
  constructor() {
    this.sub = this.activateRou.params.subscribe(data => {
      this.store = data['store']
    })
  }
  ngOnInit(): void {
    this.getBrands()
  }

  getBrands() {
    this.loading.showLoading()
    const params = new BrandsParams()
    params.page = this.nextPage
    params.store = this.store?.toString()
    this.brandServices.getBrands(params).then((result) => {
      this.loading.hideLoading()
      this.brands = result.results
      this.count = result.count
    }).catch((err) => {
      this.loading.hideLoading()
    });
  }
  nextPageIndex(event: PageEvent) {
    this.nextPage = event.pageIndex + 1;
    this.getBrands()
  }
  detailBrands(id:any){
    this.router.navigate(["/home/management/branch/"+this.store+'/brands/'+ id]);
  }
}
