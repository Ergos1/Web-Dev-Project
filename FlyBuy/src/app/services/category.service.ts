import { Injectable } from '@angular/core';
import { Category } from '../../interfaces/category';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  readonly base_url:string = "http://127.0.0.1:8000/api/categories/";//backend url

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse):any{
    return throwError(error);
  }

  getCategories():Observable<Category[]>{//READ
    return this.http.get<Category[]>(this.base_url);
  }

  getCategory(category_id:number):Observable<Category>{
    return this.http.get<Category>(this.base_url + category_id  + '/');
  }

  addCategory(category: Category): Observable<Category | any>{//CREATE
    return this.http.post<Category>(`${this.base_url}`, category).pipe(catchError(this.handleError));
  }

  deleteCategory(category: Category): Observable<Category | any>{
    return this.http.delete<Category>(`${this.base_url}${category.id}/`).pipe(catchError(this.handleError));
  }

}
