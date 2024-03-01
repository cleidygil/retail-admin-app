import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-method-bs',
  templateUrl: './method-bs.component.html',
  styleUrls: ['./method-bs.component.css']
})
export class MethodBsComponent {
  @Output() methodBs = new EventEmitter()

}
