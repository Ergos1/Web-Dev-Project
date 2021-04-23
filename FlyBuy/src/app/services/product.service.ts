import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { Product } from 'src/interfaces/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly url: string = 'http://127.0.0.1:8000/api/products/'; // backend url

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]>{ // READ
    return this.http.get<Product[]>(this.url);
  }

  getProductsByCategoryId(categoryId: number): Observable<Product[]>{
    return this.http.get<Product[]>(`http://127.0.0.1:8000/api/categories/${categoryId}/products/`)
  }

  getProduct(id: number): Observable<Product>{ // READ
    return this.http.get<Product>(this.url + id + '/');
  }

  updateProduct(Product: Product): Observable<Product>{ // UPDATE
    return this.http.put<Product>(`${this.url}/${Product.id}`, Product);
  }
  updateRating(product: Product, rating: number): Observable<Product> {
    return this.http.put<Product>(`${this.url}/${product.id}/update_rating/${rating}`, rating);
  }

  deleteProduct(Product: Product): Observable<Product>{ // DELETE
    return this.http.delete<Product>(`${this.url}/${Product.id}`);
  }

  addProduct(Product: Product): Observable<Product>{//CREATE
    return this.http.post<Product>(`${this.url}`, Product);
  }
}
