import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { GlobalService } from 'src/app/global/services/global.service';
import { QueryParamsService } from 'src/app/global/services/query-params.service';
import { environment } from 'src/environments/environment.prod';
import { MeasurementUnits, ParamsGlobal, Recipes, ProductId, Products , Tax, MeasurementUnit, MyStoreParams, AllStore, AllStores, MyRecipeParams} from '../interfaces/supplies';

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
    const obs$ = this.http.get<MeasurementUnits | MeasurementUnits[]>(`${this.url}/api/stores/measurement_units/`, {params:resparams})
    return lastValueFrom(obs$)
  }
  getAllProducts(params: ParamsGlobal): Promise<Products> {
    const resparams = this.queryParams.buildQueryParams(params)
    const obs$ = this.http.get<Products>(`${this.url}/api/products/`, {params:resparams})
    return lastValueFrom(obs$)
  }
  postProduts(body: any): Promise<any> {
    const obs$ = this.http.post<any>(`${this.url}/api/products/`, body)
    return lastValueFrom(obs$)
  }
  getProductID(id:number): Promise<ProductId> {
    const obs$ = this.http.get<ProductId>(`${this.url}/api/products/${id}`)
    return lastValueFrom(obs$)
  }
  deleteProductID(id:number): Promise<any> {
    const obs$ = this.http.delete<any>(`${this.url}/api/products/${id}`)
    return lastValueFrom(obs$)
  }
  patchProduts(body: any, id:any): Promise<any> {
    const obs$ = this.http.patch<any>(`${this.url}/api/products/${id}/`, body)
    return lastValueFrom(obs$)
  }
  deleteProducts( id:any){
    const obs$ = this.http.delete<any>(`${this.url}/api/products/${id}/`)
    return lastValueFrom(obs$)
  }
  getAllRecipes(params: MyRecipeParams): Promise<Recipes>{
    const resparams = this.queryParams.buildQueryParams(params)
    const obs$ = this.http.get<Recipes>(`${this.url}/api/recipes/`, {params:resparams})
    return lastValueFrom(obs$)
  }

  getRecipe(id:any): Promise<any>{
    const obs$ = this.http.get<ProductId>(`${this.url}/api/recipes/${id}/`)
    return lastValueFrom(obs$)
  }
  getCategoryRecipe(params: ParamsGlobal){
    const resparams = this.queryParams.buildQueryParams(params)
  }
  getAllTax(): Promise<any>{
    const obs$ = this.http.get<Tax>(`${this.url}/api/services/taxes/?store=`+this.user.store)
    return lastValueFrom(obs$)
  }
  getUserStores(params: MyStoreParams): Promise<AllStore[]> {
    const resparams = this.queryParams.buildQueryParams(params)
    const obs$ = this.http.get<AllStore[]>(`${this.url}/api/users/${this.user.id}/stores/`, {params: resparams})
    return lastValueFrom(obs$)
  }
  getMyStore(params: MyStoreParams): Promise<AllStores> {
    const resparams = this.queryParams.buildQueryParams(params)
    const obs$ = this.http.get<AllStores>(`${this.url}/api/stores/`, { params: resparams })
    return lastValueFrom(obs$)
  }
  postRecipes(body: any): Promise<any> {
    const obs$ = this.http.post<any>(`${this.url}/api/recipes/`, body)
    return lastValueFrom(obs$)
  }
  patchRecipes(body: any, id:any): Promise<any> {
    const obs$ = this.http.patch<any>(`${this.url}/api/recipes/${id}/`, body)
    return lastValueFrom(obs$)
  }
  postUpdateRecipes(body: any[], id:any): Promise<any> {
    const obs$ = this.http.post<any>(`${this.url}/api/recipes/${id}/records/`, body)
    return lastValueFrom(obs$)
  }
  deleteRecipes(id:any): Promise<any> {
    const obs$ = this.http.delete<any>(`${this.url}/api/recipes/${id}/`)
    return lastValueFrom(obs$)
  }
}
