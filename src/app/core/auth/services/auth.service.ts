import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Login, ReturnLogin } from '../interfaces/LoginInterface';
import { map, from, of, Observable, firstValueFrom, observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

// import { getMessaging, getToken } from 'firebase/messaging'
import { SnackbarService } from 'src/app/global/services/snackbar.service';
import { LoadingService } from 'src/app/global/services/loading.service';
import { GlobalService } from 'src/app/global/services/global.service';
@Injectable({
  providedIn: 'root'
})
export class AuthServices {

  status: boolean = this.token
  private isLoggedSub = new BehaviorSubject<boolean>(this.status)
  private snack = inject(SnackbarService)
  private global = inject(GlobalService)
  isLoggedSub$ = this.isLoggedSub.asObservable()
  url = environment.API_URL
  // urlNotification = environment.API_NOTIFICATION

  constructor(private http: HttpClient, private router: Router, private loading: LoadingService) { }

  async login(value: any) {
    this.loading.showLoading()
    const obs$ = await this.http.post<ReturnLogin>(`${this.url}/login/`, value)
    firstValueFrom(obs$)
      .then((result) => {
        sessionStorage.setItem('token', result.token)
        sessionStorage.setItem('user', JSON.stringify(result.user))
        sessionStorage.setItem('menus', JSON.stringify(result.user.menus))
        this.snack.openSnackBar(result.message)
        this.global.formatearUser(true, 'oficina', { id: 1, name: 'Sede Principal', status: true });
        this.snack.openSnackBar(result.message)
        this.isLoggedSub.next(true)
        this.router.navigate(['home'])
        this.loading.hideLoading()
        // this.requestPermission()
      }).catch((err) => {
        console.log(err);
        if (err.status == 400) {
          return this.snack.openSnackBar(err.error.error)
        }
        if (err.status == 0) {
          return this.snack.openSnackBar("Sin conexion con el Backend, por favor comunicarse con el administrador")
        }
        this.snack.openSnackBar("Ha ocurrido un error, por favor comunicarse con el administrador")
        this.loading.hideLoading()
        return
      });
  }

  setLoggin() {
    this.isLoggedSub.next(false)
  }

  async logout() {
    this.isLoggedSub.next(false)
    localStorage.clear()
    localStorage.clear()
    location.href = '/login'
  }

  get token(): boolean {
    const a = !!localStorage.getItem('token')
    // console.log(a);    
    return a
  }
  get isLoggedIn(): boolean {
    // Lógica para verificar si el usuario está autenticado
    return this.isLoggedSub.value;
  }
  // requestPermission() {
  //   const messaging = getMessaging();
  //   getToken(messaging, { vapidKey: environment.firebase.vpaidkey }).then(
  //     (currentToken: any) => {
  //       if (currentToken) {
  //         const user = JSON.parse(localStorage.getItem('user') || '{}');
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
