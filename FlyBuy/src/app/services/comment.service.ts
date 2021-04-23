import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Comment } from "../../interfaces/comment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  readonly base_url:string = "http://127.0.0.1:8000/api/comments/";//backend url

  constructor(private http: HttpClient) { }


  handleError(error: HttpErrorResponse):any{
    return throwError(error);
  }
  

  getComments():Observable<Comment[]>{
    return this.http.get<Comment[]>(this.base_url);
  }

  addComment(comment: Comment):Observable<Comment | any>{
    return this.http.post<Comment>(this.base_url, comment).pipe(catchError(this.handleError));
  }
}
