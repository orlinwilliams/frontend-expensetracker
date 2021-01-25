import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentUserService } from './current-user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  
  constructor(private currentUserService:CurrentUserService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.currentUserService.existToken()){
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.currentUserService.getUserToken()
      })
      const reqClone = req.clone({headers})
      return next.handle(reqClone);
    }
    return next.handle(req);
        
  }
  
}
