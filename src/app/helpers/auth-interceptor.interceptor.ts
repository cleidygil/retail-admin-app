import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthServices } from '../core/auth/services/auth.service';
import { LoadingService } from '../global/services/loading.service';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {
  constructor(private auth: AuthServices,private loading: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError((err) => {
        console.log(err);
        
        if ([401].includes(err.status)) {
          this.auth.logout();
        }
        const error = err.error?.message  || err.error?.detail  || err.statusCode  || err.statusText;
        this.loading.hideLoading()
        return throwError(() => err);
      })
    );
  }
}
