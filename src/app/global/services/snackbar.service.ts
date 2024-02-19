import { Injectable } from '@angular/core';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  snackBarRef!:MatSnackBarRef<SnackbarComponent>

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(title:string) {
    this._snackBar.open(title, 'X', {
      duration: 2000,
    });
  }

  openSnackBarComponent() {
    this.snackBarRef =this._snackBar.openFromComponent(SnackbarComponent);
    this._snackBar.dismiss()
  }
  closeSnackComponent(){
    this.snackBarRef.dismiss()
  }
}
