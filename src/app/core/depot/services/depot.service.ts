import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { GlobalService } from 'src/app/global/services/global.service';
import { QueryParamsService } from 'src/app/global/services/query-params.service';
import { environment } from 'src/environments/environment.prod';
import { Depot, Warehouses } from '../interfaces/depot';

@Injectable({
  providedIn: 'root'
})
export class DepotService {
  private http = inject(HttpClient);
  private queryParams = inject(QueryParamsService)
  private global = inject(GlobalService)
  url = environment.API_URL;
  user = this.global.User()
  constructor() { }

  getAllWarehouses(params: Depot): Promise<any> {
    const resparams = this.queryParams.buildQueryParams(params)
    const ob = this.http.get<Warehouses>(`${this.url}/api/inventory/depot/`, { params: resparams })
    return lastValueFrom(ob)
  }
  getTransferHistory(params: Depot, id:number): Promise<any> {
    const resparams = this.queryParams.buildQueryParams(params)
    const ob = this.http.get<any>(`${this.url}/api/inventory/depot/${id}/transfer/`, { params: resparams })
    return lastValueFrom(ob)
  }
  
}
