import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthServices } from '../../auth/services/auth.service';
import { SitesService } from '../services/sites.service';

@Injectable({
  providedIn: 'root'
})
export class SitesGuard implements CanActivate {
  constructor(private sites:SitesService,private router:Router){}
  canActivate():Observable<true|UrlTree>{
    return this.isSiteLogin();
  }
  
  isSiteLogin():Observable<true|UrlTree>{
    return this.sites.sitesLogin$.pipe(
      map((login:boolean)=>login || this.router.parseUrl('/sites'))
    )
  }
}
