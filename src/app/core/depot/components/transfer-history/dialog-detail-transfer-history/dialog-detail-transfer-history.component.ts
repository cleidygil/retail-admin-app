import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-detail-transfer-history',
  templateUrl: './dialog-detail-transfer-history.component.html',
  styleUrls: ['./dialog-detail-transfer-history.component.css']
})
export class DialogDetailTransferHistoryComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogDetailTransferHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
}
