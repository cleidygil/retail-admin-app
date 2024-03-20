import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { GlobalService } from 'src/app/global/services/global.service';
import { QueryParamsService } from 'src/app/global/services/query-params.service';
import { environment } from 'src/environments/environment.prod';
import { OrderItems, PurchasesOrder, PurchasesOrders, Shopping, StatusOrder } from '../interface/shopping';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  private http = inject(HttpClient);
  private queryParams = inject(QueryParamsService)
  private global = inject(GlobalService)
  url = environment.API_URL;
  user = this.global.User()
  registerPurchasePrice = new BehaviorSubject<any>({})
  constructor() { }

  getStatusOrder(params: Shopping): Promise<StatusOrder[]> {
    const resparams = this.queryParams.buildQueryParams(params)
    const ob = this.http.get<StatusOrder[]>(`${this.url}/api/services/status/`, { params: resparams })
    return lastValueFrom(ob)
  }

  getPurchasesOrders(params: Shopping): Promise<PurchasesOrders> {
    const resparams = this.queryParams.buildQueryParams(params)
    const obs$ = this.http.get<PurchasesOrders>(`${this.url}/api/inventory/purchases_order/`, { params: resparams })
    return lastValueFrom(obs$)
  }
  postPurchasesOrders(body: any): Promise<any> {
    const obs$ = this.http.post<any>(`${this.url}/api/inventory/purchases_order/`, body)
    return lastValueFrom(obs$)
  }
  getPurchasesOrdersID(id: number): Promise<PurchasesOrder> {
    const obs$ = this.http.get<PurchasesOrder>(`${this.url}/api/inventory/purchases_order/${id}/`)
    return lastValueFrom(obs$)
  }
  patchPurchasesOrders(body: any, id: number): Promise<any> {
    const obs$ = this.http.patch<any>(`${this.url}/api/inventory/purchases_order/${id}/`, body)
    return lastValueFrom(obs$)
  }
  getPurchasesOrdersItems(params: Shopping): Promise<OrderItems> {
    const resparams = this.queryParams.buildQueryParams(params)
    const obs$ = this.http.get<OrderItems>(`${this.url}/api/inventory/purchases_order/items/`, { params: resparams })
    return lastValueFrom(obs$)
  }
  patchPurchasesOrdersItems(body: any, id: number): Promise<any> {
    const obs$ = this.http.patch<any>(`${this.url}/api/inventory/purchases_order/items/${id}/`, body)
    return lastValueFrom(obs$)
  }
}
