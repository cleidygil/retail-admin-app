import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.prod';
import { lastValueFrom, Subject, BehaviorSubject } from 'rxjs';
import { Department } from '../interfaces/SitesInterface';
import { Router } from '@angular/router';
import { AuthServices } from '../../auth/services/auth.service';
import { GlobalService } from 'src/app/global/services/global.service';
import { LoadingService } from 'src/app/global/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class SitesService {
  private http = inject(HttpClient)
  private global = inject(GlobalService)
  private router = inject(Router)
  private auth = inject(AuthServices)
  private loading = inject(LoadingService)
  private sitesLogin = new BehaviorSubject<boolean>(this.validarSites())
  sitesLogin$ = this.sitesLogin.asObservable()

  fecha = this.global.Fecha()
  headers = this.global.Header()
  url= environment.API_URL

  constructor() { }


  getDepartment(sites:boolean = true):Promise<Department[]>{
    const obs$ = this.http.get<Department[]>(`${this.url}/api/gsoft/departments/${sites?'?sites=true':''}`)
    return lastValueFrom(obs$)
  }

  asignarSite(cliente:number , id=0){
    const obs$ = this.http.patch(`${this.url}/api/users/${cliente}/`,{department:id},{headers:this.headers})
    return lastValueFrom(obs$)
  }

  LoginSites(){
    this.sitesLogin.next(true)
    this.auth.setLoggin()
    this.loading.hideLoading()
    this.router.navigate(['/home/dashboard'])
  }

  validarSites():boolean{
    const user = this.global.User()
    
    return user.oficina ? true : false 
  }
  get isLoggedIn(): boolean {
    // Lógica para verificar si el usuario está autenticado
    return this.sitesLogin.value;
  }


}
