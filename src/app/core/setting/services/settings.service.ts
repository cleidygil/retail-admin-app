import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { GlobalService } from 'src/app/global/services/global.service';
import { QueryParamsService } from 'src/app/global/services/query-params.service';
import { environment } from 'src/environments/environment.prod';
import { Settings } from '../interface/settings.interface';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private http = inject(HttpClient);
  private queryParams = inject(QueryParamsService)
  private global = inject(GlobalService)
  url = environment.API_URL;
  user = this.global.User()
  constructor() { }

  getBrands(params: Settings): Promise<any> {
    const resparams = this.queryParams.buildQueryParams(params)
    const obs$ = this.http.get<any>(`${this.url}/api/stores/brands/`, { params: resparams })
    return lastValueFrom(obs$)
  }

}
