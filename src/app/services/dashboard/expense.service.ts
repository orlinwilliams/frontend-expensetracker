import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  //URL_API: string = 'http://localhost:3000/dashboard/expense/';
  URL_API: string = '/dashboard/expense/';
  currentTotalExpense$ = new EventEmitter<number>();
  constructor(private httpClient: HttpClient) {}

  createExpense(id: string, expense: any): Observable<any> {
    return this.httpClient.post(this.URL_API + id, expense);
  }
  getExpenses(idUser: string, month: string, year: string): Observable<any> {
    return this.httpClient.get(
      `${this.URL_API}${idUser}/month/${month}/year/${year}`
    );
  }
  getExpense(idUser: string, idExpense: string): Observable<any> {
    return this.httpClient.get(`${this.URL_API}${idUser}/item/${idExpense}`);
  }
  updatexpense(
    idUser: string,
    idExpense: string,
    expense: any
  ): Observable<any> {
    return this.httpClient.put(
      `${this.URL_API}${idUser}/item/${idExpense}`,
      expense
    );
  }
  deleteExpense(idUser: string, idExpense: string): Observable<any> {
    return this.httpClient.delete(`${this.URL_API}${idUser}/item/${idExpense}`);
  }
}
