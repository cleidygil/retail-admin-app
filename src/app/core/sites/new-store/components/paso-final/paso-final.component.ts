import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-paso-final',
  templateUrl: './paso-final.component.html',
  styleUrls: ['./paso-final.component.css']
})
export class PasoFinalComponent {
  @Output() valueEnd = new EventEmitter<any>()
}
