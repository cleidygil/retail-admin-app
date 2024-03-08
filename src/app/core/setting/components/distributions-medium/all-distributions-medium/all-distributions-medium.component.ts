import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/core/store/services/store.service';

@Component({
  selector: 'app-all-distributions-medium',
  templateUrl: './all-distributions-medium.component.html',
  styleUrls: ['./all-distributions-medium.component.css']
})
export class AllDistributionsMediumComponent {
  private servicesStore = inject(StoreService);
  private activateRou = inject(ActivatedRoute)
  distributionsMedium: any[] = []
  sub!: Subscription
  id: number = 0

  constructor() {
    this.activateRou.params.subscribe(data => {
      this.id = Number(data['id'])
    })
  }
  ngOnInit(): void {
    this.getDistributionsMedium()
  }

  getDistributionsMedium() {
    this.servicesStore.getMyStoreDistributionsMedium(this.id).then((result) => {
      this.distributionsMedium = result
    }).catch((err) => {
    });
  }
}
