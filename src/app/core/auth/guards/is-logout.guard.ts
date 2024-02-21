import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthServices } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class IsLogoutGuard implements CanActivate {
  constructor(private auth: AuthServices, private router: Router) { }
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return !this.auth.isLoggedIn || this.router.parseUrl('/home') 
  }

  // isLogout(): Observable<true | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   this.auth.isLoggedSub$.subscribe((login: boolean) => !login || this.router.parseUrl('/home'))
  //   this.auth.isLoggedSub$.pipe(
  //     map((login: boolean) => {
  //       console.log(login, !login, 'isLoggedSub')

  //     }))
  //   return this.auth.isLoggedSub$.pipe(
  //     map((login: boolean) => !login || this.router.parseUrl('/home'))
  //   )
  // }

}
