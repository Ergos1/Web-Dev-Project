import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Product } from 'src/interfaces/product';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly url: string = 'http://127.0.0.1:8000/api/products/'; // backend url

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse):any{
    return throwError(error);
  }


  getProducts(): Observable<Product[]>{ // READ
    return this.http.get<Product[]>(this.url);
  }

  getProductsByCategoryId(categoryId: number): Observable<Product[]>{
    return this.http.get<Product[]>(`http://127.0.0.1:8000/api/categories/${categoryId}/products/`)
  }

  getProductById(id: number): Observable<Product>{ // READ
    return this.http.get<Product>(this.url + id + '/');
  }

  updateProduct(product: Product): Observable<Product | any>{ // UPDATE
    return this.http.put<Product>(`${this.url}${product.id}/`, product).pipe(catchError(this.handleError));
  }

  deleteProduct(product: Product): Observable<Product>{ // DELETE
    return this.http.delete<Product>(`${this.url}${product.id}/`);
  }

  addProduct(product: Product): Observable<Product | any>{//CREATE
    return this.http.post<Product>(`${this.url}`, product).pipe(catchError(this.handleError));
  }
}
