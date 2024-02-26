import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.prod';
import { lastValueFrom, Subject, BehaviorSubject } from 'rxjs';
import { Store } from '../interfaces/SitesInterface';
import { Router } from '@angular/router';
import { AuthServices } from '../../auth/services/auth.service';
import { GlobalService } from 'src/app/global/services/global.service';
import { LoadingService } from 'src/app/global/services/loading.service';
import { BrandsParams } from '../../store/interfaces/store';
import { QueryParamsService } from 'src/app/global/services/query-params.service';

@Injectable({
  providedIn: 'root'
})
export class SitesService {
  private http = inject(HttpClient)
  private global = inject(GlobalService)
  private router = inject(Router)
  private auth = inject(AuthServices)
  private loading = inject(LoadingService)
  private queryParams = inject(QueryParamsService)

  private sitesLogin = new BehaviorSubject<boolean>(this.validarSites())
  sitesLogin$ = this.sitesLogin.asObservable()

  fecha = this.global.Fecha()
  headers = this.global.Header()
  url = environment.API_URL

  constructor() { }

  getStores(id:number): Promise<Store[]> {
    const obs$ = this.http.get<Store[]>(`${this.url}/api/users/${id}/stores/`)
    return lastValueFrom(obs$)
  }

  assignStore(id:number, store: number) {
    const obs$ = this.http.patch(`${this.url}/api/users/${id}/`, { store: store }, { headers: this.headers })
    return lastValueFrom(obs$)
  }

  LoginSites() {
    this.sitesLogin.next(true)
    this.auth.setLoggin()
    this.loading.hideLoading()
    this.router.navigate(['home'])
  }

  validarSites(): boolean {
    const user = this.global.User()
    return user.store ? true : false
  }


}
