import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError, switchMap, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { API } from '../core/api-routes';
import {
  AuthMeDto,
  ChangePasswordRequest,
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  RefreshRequest,
  ResetPasswordRequest
} from '../core/models/auth.models';
import {
  CURRENT_USER_KEY,
  REFRESH_TOKEN_KEY,
  TENANT_ID_KEY,
  TOKEN_KEY
} from '../core/token.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<AuthMeDto | null>;
  public currentUser$: Observable<AuthMeDto | null>;

  constructor(private readonly http: HttpClient, private readonly router: Router) {
    const savedUser = localStorage.getItem(CURRENT_USER_KEY);
    this.currentUserSubject = new BehaviorSubject<AuthMeDto | null>(savedUser ? JSON.parse(savedUser) : null);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): AuthMeDto | null {
    return this.currentUserSubject.value;
  }

  login(login: string, password: string): Observable<AuthMeDto> {
    const payload: LoginRequest = { login, password };
    return this.http.post<LoginResponse>(`${this.apiUrl}${API.AUTH}/login`, payload).pipe(
      tap((response) => this.setTokens(response)),
      switchMap(() => this.getMe())
    );
  }

  refreshToken(): Observable<LoginResponse> {
    const refreshToken = this.getStoredRefreshToken();
    if (!refreshToken) {
      return throwError(() => new Error('REFRESH_TOKEN_MANQUANT'));
    }
    const payload: RefreshRequest = { refreshToken };
    return this.http.post<LoginResponse>(`${this.apiUrl}${API.AUTH}/refresh`, payload).pipe(
      tap((response) => this.setTokens(response))
    );
  }

  getMe(): Observable<AuthMeDto> {
    return this.http.get<AuthMeDto>(`${this.apiUrl}${API.AUTH}/me`).pipe(
      tap((me) => {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(me));
        localStorage.setItem(TENANT_ID_KEY, me.tenantId);
        this.currentUserSubject.next(me);
      })
    );
  }

  logout(): void {
    this.http.post<void>(`${this.apiUrl}${API.AUTH}/logout`, {}).subscribe({
      next: () => this.clearSession(),
      error: () => this.clearSession()
    });
  }

  clearSession(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
    localStorage.removeItem(TENANT_ID_KEY);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  changePassword(request: ChangePasswordRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}${API.AUTH}/change-password`, request);
  }

  forgotPassword(email: string): Observable<void> {
    const payload: ForgotPasswordRequest = { email };
    return this.http.post<void>(`${this.apiUrl}${API.AUTH}/forgot-password`, payload);
  }

  resetPassword(request: ResetPasswordRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}${API.AUTH}/reset-password`, request);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  }

  hasRefreshToken(): boolean {
    return !!this.getStoredRefreshToken();
  }

  hasRole(roles: string[]): boolean {
    const user = this.currentUserValue;
    return !!user && roles.includes(user.role);
  }

  redirectToRoleDashboard(role: string): void {
    const roleRoutes: Record<string, string> = {
      ADMIN: '/dashboard/admin',
      ENSEIGNANT: '/dashboard/enseignant',
      ELEVE: '/dashboard/eleve',
      PARENT: '/dashboard/parent',
      CAISSIER: '/dashboard/caisse',
      SURVEILLANT: '/dashboard/surveillant',
      RH: '/dashboard/admin',
      SUPER_ADMIN: '/dashboard/admin'
    };
    this.router.navigate([roleRoutes[role] ?? '/']);
  }

  private setTokens(response: LoginResponse): void {
    localStorage.setItem(TOKEN_KEY, response.accessToken);
    if (response.refreshToken && response.refreshToken !== 'null' && response.refreshToken !== 'undefined') {
      localStorage.setItem(REFRESH_TOKEN_KEY, response.refreshToken);
    } else {
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
  }

  private getStoredRefreshToken(): string {
    const value = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (!value || value === 'null' || value === 'undefined') {
      return '';
    }
    return value;
  }
}
