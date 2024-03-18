import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { GlobalService } from 'src/app/global/services/global.service';
import { QueryParamsService } from 'src/app/global/services/query-params.service';
import { environment } from 'src/environments/environment.prod';
import { PurchasesOrders, Shopping } from '../interface/shopping';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  private http = inject(HttpClient);
  private queryParams = inject(QueryParamsService)
  private global = inject(GlobalService)
  url = environment.API_URL;
  user = this.global.User()
  constructor() { }

  getPurchasesOrders(params: Shopping): Promise<PurchasesOrders> {
    const resparams = this.queryParams.buildQueryParams(params)
    const obs$ = this.http.get<PurchasesOrders>(`${this.url}/api/inventory/purchases_order/`, { params: resparams })
    return lastValueFrom(obs$)
  }
  postPurchasesOrders(body: any): Promise<any> {
    const obs$ = this.http.post<any>(`${this.url}/api/inventory/purchases_order/`, body)
    return lastValueFrom(obs$)
  }
}
