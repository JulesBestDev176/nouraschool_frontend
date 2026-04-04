import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { API } from '../core/api-routes';
import { PageResponse } from '../core/models/page.models';
import { toHttpParams } from '../core/http.utils';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  getStats(): Observable<Record<string, unknown>> {
    return this.http.get<Record<string, unknown>>(`${this.apiUrl}${API.STATS}`);
  }

  listUsers(page = 0, size = 20): Observable<PageResponse<Record<string, unknown>>> {
    return this.http.get<PageResponse<Record<string, unknown>>>(`${this.apiUrl}${API.USERS}`, {
      params: toHttpParams({ page, size })
    });
  }

  createUser(dto: Record<string, unknown>): Observable<Record<string, unknown>> {
    return this.http.post<Record<string, unknown>>(`${this.apiUrl}${API.USERS}`, dto);
  }

  updateUser(id: string, dto: Record<string, unknown>): Observable<Record<string, unknown>> {
    return this.http.patch<Record<string, unknown>>(`${this.apiUrl}${API.USERS}/${id}`, dto);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${API.USERS}/${id}`);
  }

  resetPassword(id: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}${API.USERS}/${id}/reinitialiser-mdp`, {});
  }
}
