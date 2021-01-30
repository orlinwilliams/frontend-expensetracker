import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IncomeCategoriesService {
  URL_API: string = 'http://localhost:3000/categories/income/';
  //URL_API: string = '/categories/income/';
  constructor(private httpClient: HttpClient) {}
  createCategory(id: string, category: any): Observable<any> {
    return this.httpClient.post(this.URL_API + id, category);
  }
  getCategories(id: string): Observable<any> {
    return this.httpClient.get(this.URL_API + id);
  }
  getCategory(idUser: string, idCategory: string): Observable<any> {
    return this.httpClient.get(
      `${this.URL_API}${idUser}/category/${idCategory}`
    );
  }
  updateCategory(
    idUser: string,
    idCategory: string,
    category: any
  ): Observable<any> {
    return this.httpClient.put(
      `${this.URL_API}${idUser}/category/${idCategory}`,
      category
    );
  }
  deleteCategory(idUser: string, idCategory: string): Observable<any> {
    return this.httpClient.delete(
      `${this.URL_API}${idUser}/category/${idCategory}`
    );
  }
}
