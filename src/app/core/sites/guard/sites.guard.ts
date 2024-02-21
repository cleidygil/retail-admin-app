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
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.sites.isLoggedIn || this.router.parseUrl('/sites')
  }
  
  // isSiteLogin(): Observable<true | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
  //   return this.sites.sitesLogin$.pipe(
  //     map((login:boolean)=>login || this.router.parseUrl('/home'))
  //   )
  // }
}
