import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomeCategoriesService {
  URL_API: string = 'http://localhost:3000/categories/income';
  constructor(private httpClient: HttpClient) { }
  getCategories(id:string):Observable<any>{
    return this.httpClient.get(this.URL_API);
  }
}
