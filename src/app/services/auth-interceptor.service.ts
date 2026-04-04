import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { TOKEN_KEY } from '../core/token.constants';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  private isRefreshing = false;

  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem(TOKEN_KEY);
    const isAuthRoute = req.url.includes('/auth/login') || req.url.includes('/auth/refresh');
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status !== 401 || this.isRefreshing || isAuthRoute) {
          return throwError(() => error);
        }
        this.isRefreshing = true;
        return this.authService.refreshToken().pipe(
          switchMap((response) => {
            this.isRefreshing = false;
            const retryRequest = req.clone({
              setHeaders: {
                Authorization: `Bearer ${response.accessToken}`
              }
            });
            return next.handle(retryRequest);
          }),
          catchError((refreshError) => {
            this.isRefreshing = false;
            this.authService.clearSession();
            this.router.navigate(['/login']);
            return throwError(() => refreshError);
          })
        );
      })
    );
  }
}
