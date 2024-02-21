import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthServices } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class IsLogoutGuard implements CanActivate {
  constructor(private auth:AuthServices,private router:Router){}
  canActivate(): Observable<true| UrlTree> {
    return this.isLogout();
  }

  isLogout(): Observable<true|UrlTree>{
    return this.auth.isLoggedSub$.pipe(
        map((login:boolean)=> !login || this.router.parseUrl('/home'))
      )
  }
  
}
