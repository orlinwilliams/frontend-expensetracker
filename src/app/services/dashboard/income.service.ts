import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IncomeService {
  URL_API: string = 'http://localhost:3000/dashboard/income/';
  currentTotalIncome$ = new EventEmitter<number>();

  constructor(private httpClient: HttpClient) {}

  createIncome(idUser: string, income: any): Observable<any> {
    return this.httpClient.post(this.URL_API + idUser, income);
  }
  getIncome(idUser: string, month: string, year: string): Observable<any> {
    return this.httpClient.get(
      `${this.URL_API}${idUser}/month/${month}/year/${year}`
    );
  }
  getAnIncome(idUser: string, idIncome: string): Observable<any> {
    return this.httpClient.get(`${this.URL_API}${idUser}/item/${idIncome}`);
  }
  updateAnIncome(
    idUser: string,
    idIncome: string,
    income: any
  ): Observable<any> {
    return this.httpClient.put(
      `${this.URL_API}${idUser}/item/${idIncome}`,
      income
    );
  }
  deleteAnIncome(idUser: string, idIncome: string): Observable<any> {
    return this.httpClient.delete(`${this.URL_API}${idUser}/item/${idIncome}`);
  }
}
