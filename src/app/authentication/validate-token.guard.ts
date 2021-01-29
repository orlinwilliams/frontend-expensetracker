import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CurrentUserService } from '../services/authentication/current-user.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateTokenGuard implements CanActivate {
  constructor( private currentUserService:CurrentUserService, private router:Router ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.currentUserService.existToken()){
        return true;
      }else{
        this.router.navigateByUrl('/authentication');
        return false;
      }
      
  }
  
}
