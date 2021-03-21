import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { Product } from 'src/interfaces/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly url:string = "";//backend url

  constructor(private http: HttpClient) { }

  getProducts():Observable<Product[]>{//READ
    return this.http.get<Product[]>(this.url);
  }

  getProduct(id: number):Observable<Product>{//READ
    return this.http.get<Product>(this.url + "/" + id);
  }

  updateProduct(Product:Product):Observable<Product>{//UPDATE
    return this.http.put<Product>(`${this.url}/${Product.id}`, Product);
  }

  deleteProduct(Product:Product):Observable<Product>{//DELETE
    return this.http.delete<Product>(`${this.url}/${Product.id}`);
  }

  addProduct(Product:Product):Observable<Product>{//CREATE
    return this.http.post<Product>(`${this.url}`, Product);
  }
}
