import { Component, inject } from '@angular/core';
import { EntryAndExitService } from '../../services/entry-and-exit.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales-raw-material',
  templateUrl: './sales-raw-material.component.html',
  styleUrls: ['./sales-raw-material.component.css']
})
export class SalesRawMaterialComponent {
  private services = inject(EntryAndExitService)
private router = inject(Router)
  store: number = 0;
  ngOnInit(): void {
    console.log( this.services.idStore.value)

    this.services.idStore.value == 0 ? (this.router.navigate(['home/income_egress/egress/'])) : (this.store = this.services.idStore.value)
  }
}
