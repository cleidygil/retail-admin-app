import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Login, ReturnLogin } from '../interfaces/LoginInterface';
import { map, from, of, Observable, firstValueFrom, observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

// import { getMessaging, getToken } from 'firebase/messaging'
import { SnackbarService } from 'src/app/global/services/snackbar.service';
import { LoadingService } from 'src/app/global/services/loading.service';
@Injectable({
  providedIn: 'root'
})
export class AuthServices {

  status: boolean = this.token
  private isLoggedSub = new BehaviorSubject<boolean>(this.status)
  private snack = inject(SnackbarService)
  isLoggedSub$ = this.isLoggedSub.asObservable()
  url = environment.API_URL
  // urlNotification = environment.API_NOTIFICATION

  constructor(private http: HttpClient, private router: Router, private loading: LoadingService) { }

  async login(value: any) {
    this.loading.showLoading()
    const obs$ = await this.http.post<ReturnLogin>(`${this.url}/login/`, value)
    firstValueFrom(obs$)
      .then((result) => {
        // console.log(result)
        this.snack.openSnackBar(result.message)
        this.isLoggedSub.next(true)
        localStorage.setItem('token', result.token)
        localStorage.setItem('user', JSON.stringify(result.user))
        this.router.navigate(['sites'])
        this.loading.hideLoading()
       
        // this.requestPermission()
      }).catch((err) => {
        console.log(err);
        this.snack.openSnackBar(err)
        this.loading.hideLoading()
      });
  }

  setLoggin() {
    this.isLoggedSub.next(false)
  }

  async logout() {
    this.isLoggedSub.next(false)
    sessionStorage.clear()
    localStorage.clear()
    location.href = '/login'
  }

  get token(): boolean {
    const a = !!localStorage.getItem('token')
    // console.log(a);    
    return a
  }
  // requestPermission() {
  //   const messaging = getMessaging();
  //   getToken(messaging, { vapidKey: environment.firebase.vpaidkey }).then(
  //     (currentToken: any) => {
  //       if (currentToken) {
  //         const user = JSON.parse(sessionStorage.getItem('user') || '{}');
  //         console.log(user);
  //         console.log(currentToken);
  //         const body = {

  //           "browser_token_id": currentToken,
  //           "user": user.id,
  //           "department": user.management

  //         }
  //         let obs$ = this.http.post<any>(`${this.url}/api/gsoft/notifications/token/`, body)
  //         firstValueFrom(obs$)

  //       } else {
  //         console.log('error con el token');

  //       }
  //     }
  //   )
  // }


}
