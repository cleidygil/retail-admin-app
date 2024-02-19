import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { LoadingComponent } from '../components/loading/loading.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private load = new BehaviorSubject<boolean>(false)
  loading$ = this.load.asObservable()
  constructor(
    private dialog: MatDialog
  ) { }

  showLoading(){
    
    
    const dialogRef = this.dialog.open(LoadingComponent,{
      disableClose:true
    })
    // this.load.next(true)
    dialogRef.id = "loading";
  }
  hideLoading(){
    const dialogRef = this.dialog.getDialogById("loading");
    dialogRef?.close()
    // this.load.next(false)
  }
}
