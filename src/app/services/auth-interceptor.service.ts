import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { TENANT_ID_KEY, TOKEN_KEY } from '../core/token.constants';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  private isRefreshing = false;
  private readonly refreshToken$ = new BehaviorSubject<string | null>(null);

  constructor(private readonly authService: AuthService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem(TOKEN_KEY);
    const tenantId = localStorage.getItem(TENANT_ID_KEY);
    const isAuthRoute = req.url.includes('/auth/login') || req.url.includes('/auth/refresh');
    const isApiRequest = req.url.startsWith('http') || req.url.startsWith('/api');
    const headers: Record<string, string> = {};
    if (token && isApiRequest) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    if (tenantId && isApiRequest) {
      headers['X-Tenant-Id'] = tenantId;
    }
    if (Object.keys(headers).length > 0) {
      req = req.clone({ setHeaders: headers });
    }
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status !== 401 || isAuthRoute) {
          return throwError(() => error);
        }

        if (!this.authService.hasRefreshToken()) {
          this.authService.clearSession();
          return throwError(() => error);
        }

        if (this.isRefreshing) {
          return this.refreshToken$.pipe(
            filter((refreshedToken): refreshedToken is string => !!refreshedToken),
            take(1),
            switchMap((refreshedToken) => next.handle(this.withAuthHeaders(req, refreshedToken))),
          );
        }

        this.isRefreshing = true;
        this.refreshToken$.next(null);
        return this.authService.refreshToken().pipe(
          switchMap((response) => {
            this.isRefreshing = false;
            this.refreshToken$.next(response.accessToken);
            return next.handle(this.withAuthHeaders(req, response.accessToken));
          }),
          catchError((refreshError) => {
            this.isRefreshing = false;
            this.refreshToken$.next(null);
            this.authService.clearSession();
            return throwError(() => refreshError);
          })
        );
      })
    );
  }

  private withAuthHeaders(req: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    const tenantId = localStorage.getItem(TENANT_ID_KEY);
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        ...(tenantId ? { 'X-Tenant-Id': tenantId } : {}),
      },
    });
  }
}
