import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthToken } from 'src/interfaces/authtoken';
import { User } from 'src/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly base_url:string = "http://127.0.0.1:8000/api/";//backend url

  constructor(private http: HttpClient) { }

  login(username:string, password:string):Observable<AuthToken> {
    return this.http.post<AuthToken>(this.base_url + 'login/', {
      username,
      password
    })
  }

  getUser(username:string):Observable<User>{
    return this.http.post<User>(this.base_url + 'user/', {
      username
    })
  }

}
