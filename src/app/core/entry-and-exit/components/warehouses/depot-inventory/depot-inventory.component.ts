import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-depot-inventory',
  templateUrl: './depot-inventory.component.html',
  styleUrls: ['./depot-inventory.component.css']
})
export class DepotInventoryComponent {
  @Input() item:any

}
