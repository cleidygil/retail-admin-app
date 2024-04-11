import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-depot-purcharse-order',
  templateUrl: './depot-purcharse-order.component.html',
  styleUrls: ['./depot-purcharse-order.component.css']
})
export class DepotPurcharseOrderComponent {
@Input() item:any
}
