import { Component } from '@angular/core';

@Component({
  selector: 'app-manual-entry',
  templateUrl: './manual-entry.component.html',
  styleUrls: ['./manual-entry.component.css']
})
export class ManualEntryComponent {
  paso1: boolean = true
  paso2: boolean = false
  pasoFinal: boolean = false
  value1: any
  value2: any
  valueEnd: any
  onSubmit(){

  }
}
