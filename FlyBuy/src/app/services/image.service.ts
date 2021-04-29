import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Image } from 'src/interfaces/image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  readonly base_url:string = "http://127.0.0.1:8000/api/images/";//backend url

  constructor(private http: HttpClient) { }


  handleError(error: HttpErrorResponse):any{
    return throwError(error);
  }
  
  addImage(image: Image):Observable<Image | any>{
    return this.http.post<Image>(this.base_url, image).pipe(catchError(this.handleError));
  }
}
