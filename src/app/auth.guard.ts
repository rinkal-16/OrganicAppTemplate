import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private _loginService: LoginService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let url: string = state.url;
      return this.checkLogin(url);
      // if(localStorage.getItem('token')) {
      //   return true
      // } else {        
      //   this.router.navigate(["/login"]);
      //   return false
      // }
    //return true;
  }

  checkLogin(url: string): boolean {
    if(this._loginService.isLoggedIn) {
      return true;
    }
    this._loginService.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;
  }
  
}
