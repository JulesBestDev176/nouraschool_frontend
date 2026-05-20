import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, throwError, tap } from 'rxjs';
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
  IS_PLATFORM_KEY,
  REFRESH_TOKEN_EXPIRES_AT_KEY,
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
      map((response) => this.buildSessionUser(response.accessToken))
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
        if (me.tenantId) {
          localStorage.setItem(TENANT_ID_KEY, me.tenantId);
        } else {
          localStorage.removeItem(TENANT_ID_KEY);
        }
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
    localStorage.removeItem(REFRESH_TOKEN_EXPIRES_AT_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
    localStorage.removeItem(TENANT_ID_KEY);
    localStorage.removeItem(IS_PLATFORM_KEY);
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
    return !!this.getStoredRefreshToken() && !this.isRefreshTokenExpired();
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
      const refreshExpiresIn = Number(response.refreshExpiresIn ?? 24 * 60 * 60);
      localStorage.setItem(REFRESH_TOKEN_EXPIRES_AT_KEY, String(Date.now() + refreshExpiresIn * 1000));
    } else {
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_EXPIRES_AT_KEY);
    }
  }

  private getStoredRefreshToken(): string {
    if (this.isRefreshTokenExpired()) {
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_EXPIRES_AT_KEY);
      return '';
    }
    const value = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (!value || value === 'null' || value === 'undefined') {
      return '';
    }
    return value;
  }

  private isRefreshTokenExpired(): boolean {
    const expiresAt = Number(localStorage.getItem(REFRESH_TOKEN_EXPIRES_AT_KEY) ?? 0);
    return !!expiresAt && Date.now() >= expiresAt;
  }

  private buildSessionUser(accessToken: string): AuthMeDto {
    const payload = this.decodeJwtPayload(accessToken);
    const email = typeof payload?.['email'] === 'string' ? (payload['email'] as string) : '';
    const nameParts = email ? email.split('@')[0].split('.') : [];
    const prenom = this.normalizeNamePart(nameParts[0] ?? 'Utilisateur');
    const nom = this.normalizeNamePart(nameParts[1] ?? nameParts[0] ?? 'Noura');
    const tenantId = typeof payload?.['tenantId'] === 'string' ? (payload['tenantId'] as string) : '';
    const isPlatform = payload?.['isPlatform'] === true;
    const role = payload?.['role'] as AuthMeDto['role'] | undefined;

    const me: AuthMeDto = {
      id: typeof payload?.['sub'] === 'string' ? (payload['sub'] as string) : '',
      email,
      role: role ?? 'ADMIN',
      tenantId,
      prenom,
      nom
    };

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(me));
    if (tenantId) {
      localStorage.setItem(TENANT_ID_KEY, tenantId);
    } else {
      localStorage.removeItem(TENANT_ID_KEY);
    }
    if (isPlatform) {
      localStorage.setItem(IS_PLATFORM_KEY, 'true');
    } else {
      localStorage.removeItem(IS_PLATFORM_KEY);
    }
    this.currentUserSubject.next(me);
    return me;
  }

  private decodeJwtPayload(token: string): Record<string, unknown> | null {
    const parts = token.split('.');
    if (parts.length < 2) {
      return null;
    }

    try {
      const normalized = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
      return JSON.parse(atob(padded));
    } catch {
      return null;
    }
  }

  private normalizeNamePart(value: string): string {
    const cleaned = value.replace(/[^a-zA-ZÀ-ÿ'-]+/g, ' ').trim();
    if (!cleaned) {
      return 'Utilisateur';
    }

    return cleaned
      .split(/\s+/)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(' ');
  }
}
