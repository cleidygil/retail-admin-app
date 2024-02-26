import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { GlobalService } from 'src/app/global/services/global.service';
import { QueryParamsService } from 'src/app/global/services/query-params.service';
import { environment } from 'src/environments/environment.prod';
import { AllStore, AllStores, Brands, BrandsParams, MethosdParams } from '../interfaces/store';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private http = inject(HttpClient);
  private queryParams = inject(QueryParamsService)
  private global = inject(GlobalService)
  url = environment.API_URL;
  constructor() { }

  getBrands(params: BrandsParams): Promise<Brands> {
    const resparams = this.queryParams.buildQueryParams(params)
    const obs$ = this.http.get<Brands>(`${this.url}/api/stores/brands/`, { params: resparams })
    return lastValueFrom(obs$)
  }
  setBrands(body:any): Promise<any> {
    const obs$ = this.http.post<any>(`${this.url}/api/stores/brands/`,body)
    return lastValueFrom(obs$)
  }
  patchBrandID(body:any, id:number): Promise<any> {
    const obs$ = this.http.patch<any>(`${this.url}/api/stores/brands/${id}/`,body)
    return lastValueFrom(obs$)
  }
  getMyStore(params: BrandsParams): Promise<AllStores> {
    const resparams = this.queryParams.buildQueryParams(params)
    const obs$ = this.http.get<AllStores>(`${this.url}/api/stores/`, { params: resparams })
    return lastValueFrom(obs$)
  }
  setMyStore(body:any): Promise<any> {
    const obs$ = this.http.post<any>(`${this.url}/api/stores/`,body)
    return lastValueFrom(obs$)
  }
  patchMyStoreID(body:any, id:number): Promise<any> {
    const obs$ = this.http.patch<any>(`${this.url}/api/stores/${id}/`,body)
    return lastValueFrom(obs$)
  }
  getMyStoreID(id:number): Promise<AllStore> {
    const obs$ = this.http.get<AllStore>(`${this.url}/api/stores/${id}/`)
    return lastValueFrom(obs$)
  }
  getMyStoreUsers(id:number): Promise<AllStore> {
    const obs$ = this.http.get<AllStore>(`${this.url}/api/stores/${id}/users/`)
    return lastValueFrom(obs$)
  }
  postMyStoreUsers(body:any, id:number): Promise<any> {
    const obs$ = this.http.post<any>(`${this.url}/api/stores/${id}/users/`,body)
    return lastValueFrom(obs$)
  }
  getMyStorePaymentMethods(id:number): Promise<AllStore> {
    const obs$ = this.http.get<AllStore>(`${this.url}/api/stores/${id}/payment_methods/`)
    return lastValueFrom(obs$)
  }
  postMyStorePaymentMethods(body:any, id:number): Promise<any> {
    const obs$ = this.http.post<any>(`${this.url}/api/stores/${id}/payment_methods/`,body)
    return lastValueFrom(obs$)
  }
  getPaymentMethods(params:MethosdParams): Promise<any> {
    const resparams = this.queryParams.buildQueryParams(params)
    const obs$ = this.http.get<any>(`${this.url}/api/payments/methods/`, { params: resparams })
    return lastValueFrom(obs$)
  }
}
