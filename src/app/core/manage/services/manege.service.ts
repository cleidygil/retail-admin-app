import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { GlobalService } from 'src/app/global/services/global.service';
import { QueryParamsService } from 'src/app/global/services/query-params.service';
import { environment } from 'src/environments/environment.prod';
import { BrandsParams, Brands, Management, Taxes, Category, Categories, Brand, Ambients, Ambient } from '../interface/manege.interface';

@Injectable({
  providedIn: 'root'
})
export class ManageService {
  private http = inject(HttpClient);
  private queryParams = inject(QueryParamsService)
  private global = inject(GlobalService)
  url = environment.API_URL;
  user = this.global.User()
  store = new BehaviorSubject<string>('')
  productsArr = new BehaviorSubject<any[]>([])
  typeCategories = new BehaviorSubject<number>(0)
  constructor() { }

  getBrands(params: BrandsParams): Promise<any> {
    const resparams = this.queryParams.buildQueryParams(params)
    const obs$ = this.http.get<Brands | Brand>(`${this.url}/api/stores/brands/`, { params: resparams })
    return lastValueFrom(obs$)
  }
  setBrands(body:any): Promise<any> {
    const obs$ = this.http.post<any>(`${this.url}/api/stores/brands/`,body)
    return lastValueFrom(obs$)
  }
  getBrandId(id:number): Promise<any> {
    const obs$ = this.http.get<any>(`${this.url}/api/stores/brands/${id}/`)
    return lastValueFrom(obs$)
  }
  patchBrandID(body:any, id:number): Promise<any> {
    const obs$ = this.http.patch<any>(`${this.url}/api/stores/brands/${id}/`,body)
    return lastValueFrom(obs$)
  }
  deleteBrandId(id:number): Promise<any> {
    const obs$ = this.http.delete<any>(`${this.url}/api/stores/brands/${id}/`)
    return lastValueFrom(obs$)
  }
  getMeasurementunits(params: Management): Promise<any> {
    const resparams = this.queryParams.buildQueryParams(params)
    const obs$ = this.http.get<any>(`${this.url}/api/stores/measurement_units/`, { params: resparams })
    return lastValueFrom(obs$)
  }
  setMeasurementunits(body:any): Promise<any> {
    const obs$ = this.http.post<any>(`${this.url}/api/stores/measurement_units/`,body)
    return lastValueFrom(obs$)
  }
  getSuppliers(params: BrandsParams): Promise<any> {
    const resparams = this.queryParams.buildQueryParams(params)
    const obs$ = this.http.get<any>(`${this.url}/api/stores/suppliers/`, { params: resparams })
    return lastValueFrom(obs$)
  }
  setSuppliers(body:any): Promise<any> {
    const obs$ = this.http.post<any>(`${this.url}/api/stores/suppliers/`,body)
    return lastValueFrom(obs$)
  }
  getSuppliersId(id:number): Promise<any> {
    const obs$ = this.http.get<any>(`${this.url}/api/stores/suppliers/${id}/`)
    return lastValueFrom(obs$)
  }
  patchSuppliersID(body:any, id:number): Promise<any> {
    const obs$ = this.http.patch<any>(`${this.url}/api/stores/suppliers/${id}/`,body)
    return lastValueFrom(obs$)
  }
  getTaxes(params: Management): Promise<Taxes[]> {
    const resparams = this.queryParams.buildQueryParams(params)
    const obs$ = this.http.get<Taxes[]>(`${this.url}/api/services/taxes/`, {params: resparams})
    return lastValueFrom(obs$)
  }
  getTaxesId(id:any): Promise<any> {
    const obs$ = this.http.get<Taxes[]>(`${this.url}/api/services/taxes/${id}/`)
    return lastValueFrom(obs$)
  }
  postTaxes(body:any,): Promise<any> {
    const obs$ = this.http.post<any>(`${this.url}/api/services/taxes/`,body)
    return lastValueFrom(obs$)
  }
  patchTaxes(body:any,id:any): Promise<any>{
    const obs$ = this.http.patch<any>(`${this.url}/api/services/taxes/${id}/`,body)
    return lastValueFrom(obs$)
  }
  deleteTaxesID(id:number): Promise<any> {
    const obs$ = this.http.delete<any>(`${this.url}/api/services/taxes/${id}/`)
    return lastValueFrom(obs$)
  }
  getCategories(params: Management): Promise<Categories> {
    const resparams = this.queryParams.buildQueryParams(params)
    const obs$ = this.http.get<Categories>(`${this.url}/api/products/categories/`, { params: resparams })
    return lastValueFrom(obs$)
  }
  postCategory(body:any): Promise<any> {
    const obs$ = this.http.post<any>(`${this.url}/api/products/categories/`,body)
    return lastValueFrom(obs$)
  }
  getCategoryID(id:number): Promise<Category> {
    const obs$ = this.http.get<Category>(`${this.url}/api/products/categories/${id}/`)
    return lastValueFrom(obs$)
  }
  patchCategoryID(body:any, id:number): Promise<any> {
    const obs$ = this.http.patch<any>(`${this.url}/api/products/categories/${id}/`,body)
    return lastValueFrom(obs$)
  }
  deletehCategoryID(id:number): Promise<any> {
    const obs$ = this.http.delete<any>(`${this.url}/api/products/categories/${id}/`)
    return lastValueFrom(obs$)
  }
  getAmbients(params: Management): Promise<any> {
    const resparams = this.queryParams.buildQueryParams(params)
    const obs$ = this.http.get<Ambients | Ambient>(`${this.url}/api/stores/ambients/`, { params: resparams })
    return lastValueFrom(obs$)
  }
  getAmbientsID(id:any): Promise<any> {
    const obs$ = this.http.get<any>(`${this.url}/api/stores/ambients/${id}/`)
    return lastValueFrom(obs$)
  }
  postAmbients(body:any): Promise<any> {
    const obs$ = this.http.post<any>(`${this.url}/api/stores/ambients/`,body)
    return lastValueFrom(obs$)
  }
  deletehAmbientID(id:number): Promise<any> {
    const obs$ = this.http.delete<any>(`${this.url}/api/stores/ambients/${id}/`)
    return lastValueFrom(obs$)
  }
  getTables(params: Management): Promise<any> {
    const resparams = this.queryParams.buildQueryParams(params)
    const obs$ = this.http.get<any>(`${this.url}/api/stores/tables/`, { params: resparams })
    return lastValueFrom(obs$)
  }
  getTablesID(id:any):Promise<any>{
    const obs$ = this.http.get<any>(`${this.url}/api/stores/tables/${id}`)
    return lastValueFrom(obs$)
  }
  getAmbientsTables(params: Management): Promise<any> {
    const resparams = this.queryParams.buildQueryParams(params)
    const obs$ = this.http.get<any>(`${this.url}/api/stores/ambients/`, { params: resparams })
    return lastValueFrom(obs$)
  }
  postTables(body:any): Promise<any> {
    const obs$ = this.http.post<any>(`${this.url}/api/stores/tables/`,body)
    return lastValueFrom(obs$)
  }
}
 