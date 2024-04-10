import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-detail-entry-exit',
  templateUrl: './dialog-detail-entry-exit.component.html',
  styleUrls: ['./dialog-detail-entry-exit.component.css']
})
export class DialogDetailEntryExitComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogDetailEntryExitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
