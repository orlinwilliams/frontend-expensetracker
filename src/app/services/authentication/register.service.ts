import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/authentication/user';
@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  //URL_API: string = 'http://localhost:3000/register';
  URL_API: string = '/register';
  constructor(private httpClient: HttpClient) {}

  register(user: User): Observable<any> {
    return this.httpClient.post(this.URL_API, user);
  }
}
