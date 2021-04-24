import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthToken } from 'src/interfaces/authtoken';

@Injectable({
  providedIn: 'root'
})
export class AuthinterceptorService implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    // console.log(request);
    if (localStorage.getItem('token')){
      const token: AuthToken = JSON.parse(localStorage.getItem('token') || '{"token":""}');
      const newRequest = request.clone({
        headers: request.headers.append('Authorization', `JWT ${token.token}`)
      });
      // console.log(newRequest);
      return next.handle(newRequest);
    }

    return next.handle(request);
  }
}
