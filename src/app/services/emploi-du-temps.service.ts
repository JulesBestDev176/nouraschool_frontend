import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { API } from '../core/api-routes';
import { toHttpParams } from '../core/http.utils';

@Injectable({
  providedIn: 'root'
})
export class EmploiDuTempsService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  list(page = 0, size = 50): Observable<Record<string, unknown>> {
    return this.http.get<Record<string, unknown>>(`${this.apiUrl}${API.EMPLOIS}`, {
      params: toHttpParams({ page, size })
    });
  }

  create(dto: Record<string, unknown>): Observable<Record<string, unknown>> {
    return this.http.post<Record<string, unknown>>(`${this.apiUrl}${API.EMPLOIS}`, dto);
  }

  update(id: string, dto: Record<string, unknown>): Observable<Record<string, unknown>> {
    return this.http.put<Record<string, unknown>>(`${this.apiUrl}${API.EMPLOIS}/${id}`, dto);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${API.EMPLOIS}/${id}`);
  }
}
