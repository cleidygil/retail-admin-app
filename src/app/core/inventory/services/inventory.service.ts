import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { GlobalService } from 'src/app/global/services/global.service';
import { QueryParamsService } from 'src/app/global/services/query-params.service';
import { environment } from 'src/environments/environment.prod';
import { Inventory } from '../interfaces/inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private http = inject(HttpClient);
  private queryParams = inject(QueryParamsService)
  private global = inject(GlobalService)
  url = environment.API_URL;
  user = this.global.User()
  constructor() { }

  getAllInventory(params: Inventory): Promise<any> {
    const resparams = this.queryParams.buildQueryParams(params)
    const ob = this.http.get<any>(`${this.url}/api/inventory/`, { params: resparams })
    return lastValueFrom(ob)
  }
  patchInventoryTransaction(body: any): Promise<any> {
    const obs$ = this.http.post<any>(`${this.url}/api/inventory/transaction/`, body)
    return lastValueFrom(obs$)
  }
   postTransferProduct(body: any, id:number): Promise<any> {
    const obs$ = this.http.post<any>(`${this.url}/api/inventory/depot/${id}/transfer/`, body)
    return lastValueFrom(obs$)
  }
}
