import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { GlobalService } from 'src/app/global/services/global.service';
import { QueryParamsService } from 'src/app/global/services/query-params.service';
import { environment } from 'src/environments/environment.prod';
import { Entry, EntryAndExit, WarehousesEandE } from '../interfaces/entry-and-exit';

@Injectable({
  providedIn: 'root'
})
export class EntryAndExitService {
  private http = inject(HttpClient);
  private queryParams = inject(QueryParamsService)
  private global = inject(GlobalService)
  url = environment.API_URL;
  user = this.global.User()
  paso1 = new BehaviorSubject<any | null>(null)
  paso2 = new BehaviorSubject<any | null>(null)
  pasoFinal = new BehaviorSubject<any | null>(null)
  array = new BehaviorSubject<any[]>([])
  loadProduct = new BehaviorSubject<any>(null)
  loadProductShow = new BehaviorSubject<any>(null)
  idStore = new BehaviorSubject<number>(0)
  constructor() { }

  getStatusOrder(params: EntryAndExit): Promise<any> {
    const resparams = this.queryParams.buildQueryParams(params)
    const ob = this.http.get<any>(`${this.url}/api/services/status/`, { params: resparams })
    return lastValueFrom(ob)
  }
  getDepotInventory(params: EntryAndExit): Promise<any> {
    const resparams = this.queryParams.buildQueryParams(params)
    const ob = this.http.get<WarehousesEandE | Entry[]>(`${this.url}/api/inventory/depot_inventory/`, { params: resparams })
    return lastValueFrom(ob)
  }
  getDepotPurcahrseOrder(params: EntryAndExit): Promise<any> {
    const resparams = this.queryParams.buildQueryParams(params)
    const ob = this.http.get<WarehousesEandE | Entry[]>(`${this.url}/api/inventory/purchases_order_depot/`, { params: resparams })
    return lastValueFrom(ob)
  }
  getOptionsInventory(params: EntryAndExit): Promise<any> {
    const resparams = this.queryParams.buildQueryParams(params)
    const ob = this.http.get<any>(`${this.url}/api/inventory/depot/options/`, { params: resparams })
    return lastValueFrom(ob)
  }
  postOptions(body: any): Promise<any> {
    const ob = this.http.post<any>(`${this.url}/api/inventory/depot/options/`, body)
    return lastValueFrom(ob)
  }
  getrash(params: EntryAndExit): Promise<any> {
    const resparams = this.queryParams.buildQueryParams(params)
    const ob = this.http.get<any>(`${this.url}/api/inventory/depot/trash/`, { params: resparams })
    return lastValueFrom(ob)
  }
  postTrash(body: any): Promise<any> {
    const ob = this.http.post<any>(`${this.url}/api/inventory/depot/trash/`, body)
    return lastValueFrom(ob)
  }
}
