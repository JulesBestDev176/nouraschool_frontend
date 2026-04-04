import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { API } from '../core/api-routes';
import { toHttpParams } from '../core/http.utils';

@Injectable({
  providedIn: 'root'
})
export class CoursService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  list(classeId?: string): Observable<Record<string, unknown>[]> {
    return this.http.get<Record<string, unknown>[]>(`${this.apiUrl}${API.COURS}`, {
      params: toHttpParams({ classeId })
    });
  }

  create(dto: Record<string, unknown>): Observable<Record<string, unknown>> {
    return this.http.post<Record<string, unknown>>(`${this.apiUrl}${API.COURS}`, dto);
  }

  update(id: string, dto: Record<string, unknown>): Observable<Record<string, unknown>> {
    return this.http.put<Record<string, unknown>>(`${this.apiUrl}${API.COURS}/${id}`, dto);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${API.COURS}/${id}`);
  }
}
