import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  URL_API: string = 'http://localhost:3000/dashboard/income/';
  constructor(private httpClient: HttpClient) {}
  createIncome(id: string, income: any): Observable<any> {
    return this.httpClient.post(this.URL_API + id, income);
  }
  getIncome(id: string): Observable<any> {
    return this.httpClient.get(this.URL_API + id);
  }
  getCategory(idUser: string, idCategory: string): Observable<any> {
    return this.httpClient.get(
      `${this.URL_API}${idUser}/item/${idCategory}`
    );
  }
  updateCategory(
    idUser: string,
    idCategory: string,
    category: any
  ): Observable<any> {
    return this.httpClient.put(
      `${this.URL_API}${idUser}/item/${idCategory}`,
      category
    );
  }
  deleteCategory(idUser: string, idCategory: string): Observable<any> {
    return this.httpClient.delete(
      `${this.URL_API}${idUser}/category/${idCategory}`
    );
  }
  
}
