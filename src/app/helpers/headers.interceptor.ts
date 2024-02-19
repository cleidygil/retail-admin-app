import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from '../global/services/global.service';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor(private global:GlobalService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {    
    const token = this.global.Token
    let req = request
    if (token) {
      req = request.clone({
        headers:request.headers.set('Authorization',`Token ${token}`)
      })
    }
    return next.handle(req);
  }
}



