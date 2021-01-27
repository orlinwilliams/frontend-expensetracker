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
  
  getIncome(idUser:string, month:string, year:string){
    return this.httpClient.get(
      `${this.URL_API}${idUser}/month/${month}/year/${year}`
    );
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
  deleteAnIncome(idUser: string, idIncome: string): Observable<any> {
    return this.httpClient.delete(
      `${this.URL_API}${idUser}/item/${idIncome}`
    );
  }
  
}
