import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {User}  from '../../models/authentication/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  URL_API: string = 'http://localhost:3000/login';
  
  constructor(private httpClient:HttpClient) { }
  
  login(user:User):Observable<any>{
    return this.httpClient.post(this.URL_API, user);
  }

  logout(){
    localStorage.removeItem('data');
  
  }
  
}
