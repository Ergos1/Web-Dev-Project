import { Injectable } from '@angular/core';
import { Category } from '../../interfaces/category';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  readonly baseUrl: string = 'http://127.0.0.1:8000/api/categories/'; // backend url

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]>{ // READ
    return this.http.get<Category[]>(this.baseUrl);
  }

  getCategory(categoryId: number): Observable<Category>{
    return this.http.get<Category>(this.baseUrl + categoryId  + '/');
  }

}
