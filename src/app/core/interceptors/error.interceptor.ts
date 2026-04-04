import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ApiErrorResponse } from '../models/error.models';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const apiError = error.error as ApiErrorResponse;
        if (error.status === 403) {
          console.error('[ErrorInterceptor][intercept] Acces refuse', apiError);
        } else if (error.status >= 400 && error.status !== 401) {
          console.error('[ErrorInterceptor][intercept] Requete en erreur', apiError);
        }
        return throwError(() => error);
      })
    );
  }
}
