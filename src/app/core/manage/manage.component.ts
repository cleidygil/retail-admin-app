import { Component, inject } from '@angular/core';
import { ManageService } from './services/manege.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent {
  private services = inject(ManageService);

  option(url: string) {
    this.services.store.next(url)
  }
}
