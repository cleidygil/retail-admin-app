import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {
  
  constructor(private dialog:MatDialog) { }

  openConfirm(text:string):MatDialogRef<ConfirmDialogComponent>{
    return this.dialog.open(ConfirmDialogComponent,{
      data:text
    })
  }
}
