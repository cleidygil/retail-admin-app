import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-distributions-medium',
  templateUrl: './new-distributions-medium.component.html',
  styleUrls: ['./new-distributions-medium.component.css']
})
export class NewDistributionsMediumComponent {
  private activateRou = inject(ActivatedRoute)
  private router = inject(Router)
  sub!: Subscription
  id: number = 0
  constructor() {
    this.activateRou.params.subscribe(data => {
      this.id = Number(data['id'])
    })
  }
}
