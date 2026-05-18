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
import { TENANT_ID_KEY, TOKEN_KEY } from '../core/token.constants';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  private isRefreshing = false;

  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem(TOKEN_KEY);
    const tenantId = localStorage.getItem(TENANT_ID_KEY);
    const isAuthRoute = req.url.includes('/auth/login') || req.url.includes('/auth/refresh');
    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    if (tenantId) {
      headers['X-Tenant-Id'] = tenantId;
    }
    if (Object.keys(headers).length > 0) {
      req = req.clone({ setHeaders: headers });
    }
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status !== 401 || this.isRefreshing || isAuthRoute) {
          return throwError(() => error);
        }

        if (!this.authService.hasRefreshToken()) {
          this.authService.clearSession();
          this.router.navigate(['/login']);
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
