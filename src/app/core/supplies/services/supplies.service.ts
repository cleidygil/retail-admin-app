import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { GlobalService } from 'src/app/global/services/global.service';
import { QueryParamsService } from 'src/app/global/services/query-params.service';
import { environment } from 'src/environments/environment.prod';
import { ParamsGlobal } from '../interfaces/supplies';

@Injectable({
  providedIn: 'root'
})
export class SuppliesService {
  private http = inject(HttpClient);
  private queryParams = inject(QueryParamsService)
  private global = inject(GlobalService)
  url = environment.API_URL;
  user = this.global.User()
  constructor() { }

  getCategories(params: ParamsGlobal): Promise<any> {
    const resparams = this.queryParams.buildQueryParams(params)
    const obs$ = this.http.get<any>(`${this.url}/api/products/categories/`, {params: resparams})
    return lastValueFrom(obs$)
  }
  getMeasurementUnits(params: ParamsGlobal): Promise<any> {
    const resparams = this.queryParams.buildQueryParams(params)
    const obs$ = this.http.get<any>(`${this.url}/api/stores/measurement_units/`, {params:resparams})
    return lastValueFrom(obs$)
  }
  getAllProducts(params: ParamsGlobal): Promise<any> {
    const resparams = this.queryParams.buildQueryParams(params)
    const obs$ = this.http.get<any>(`${this.url}/api/products/`, {params:resparams})
    return lastValueFrom(obs$)
  }
  postProduts(body: any): Promise<any> {
    const obs$ = this.http.post<any>(`${this.url}/api/products/`, body)
    return lastValueFrom(obs$)
  }
}
