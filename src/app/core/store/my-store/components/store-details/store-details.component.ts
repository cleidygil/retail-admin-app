import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoadingService } from 'src/app/global/services/loading.service';
import { StoreService } from '../../../services/store.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AllStore } from '../../../interfaces/store';

@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.css']
})
export class StoreDetailsComponent {
  private services = inject(StoreService)
  private loading = inject(LoadingService);
  private dialog = inject(MatDialog)
  private activateRou = inject(ActivatedRoute)
  id: number = 0
  sub!: Subscription
  info!: AllStore
  constructor() {
    this.sub = this.activateRou.params.subscribe((data) => {
      this.id = Number(data['id'])
    })
  }
  ngOnInit(): void {
    this.getStoreID()
  }

  getStoreID() {
    this.loading.showLoading()
    this.services.getMyStoreID(this.id).then((result) => {
      this.loading.hideLoading()
      this.info = result
        }).catch((err) => {
      this.loading.hideLoading()
    });
  }
}
