import { Injectable } from '@angular/core';
import { News } from '../../interfaces/news';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  readonly base_url:string = "http://127.0.0.1:8000/api/news/";//backend url

  constructor(private http: HttpClient) { }

  getNews():Observable<News[]>{//READ
    return this.http.get<News[]>(this.base_url);
  }

}
