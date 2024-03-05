import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { GlobalService } from 'src/app/global/services/global.service';
import { QueryParamsService } from 'src/app/global/services/query-params.service';
import { environment } from 'src/environments/environment.prod';
import { UserStore } from '../../store/interfaces/store';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http = inject(HttpClient);
  private queryParams = inject(QueryParamsService)
  private global = inject(GlobalService)
  url = environment.API_URL;
  user = this.global.User()
  constructor() { }
  getMyAccountStores(id: number): Promise<UserStore[]> {
    const obs$ = this.http.get<UserStore[]>(`${this.url}/api/stores/${id}/users/`)
    return lastValueFrom(obs$)
  }
  postUsers(body: any): Promise<any> {
    const obs$ = this.http.post<any>(`${this.url}/api/users/`, body)
    return lastValueFrom(obs$)
  }
}
