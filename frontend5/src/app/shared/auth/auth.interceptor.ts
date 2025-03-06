import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { from, Observable, switchMap } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: Auth) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return user(this.auth).pipe(
      switchMap(firebaseUser => {
        if (firebaseUser) {
          return from(firebaseUser.getIdToken()).pipe(
            switchMap(token => {
              const cloned = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${token}`
                }
              });
              return next.handle(cloned);
            })
          );
        } else {
          return next.handle(request);
        }
      })
    );
  }
}
