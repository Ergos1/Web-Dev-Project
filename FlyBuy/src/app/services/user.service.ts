import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthToken } from 'src/interfaces/authtoken';
import { User } from 'src/interfaces/user';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly base_url: string = 'http://127.0.0.1:8000/api/';//backend url
  isLogin:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse):any{
    return throwError(error);
  }
  
  
  getToken(username: string, password: string): Observable<AuthToken | any> {
    return this.http.post<AuthToken>(this.base_url + 'login/', {
      username,
      password
    }).pipe(catchError(this.handleError));
  }


  getUser(username: string): Observable<User>{
    return this.http.post<User>(this.base_url + 'user/', {
      username
    })
  }


  getIsLogin():Observable<boolean>{
    return this.isLogin;
  }


  addUser(user:User): Observable<User | any>{
    return this.http.post<User>(this.base_url + 'sign-up/', 
    user
    ).pipe(catchError(this.handleError));
  }


  setIsLogin(value:boolean):void{
    this.isLogin.next(value);
  }

}
