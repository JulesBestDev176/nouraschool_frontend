import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { API } from '../core/api-routes';
import { PageResponse } from '../core/models/page.models';
import { toHttpParams } from '../core/http.utils';

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  listPersonnel(page = 0, size = 20): Observable<PageResponse<Record<string, unknown>>> {
    return this.http.get<PageResponse<Record<string, unknown>>>(`${this.apiUrl}${API.PERSONNEL}`, {
      params: toHttpParams({ page, size })
    });
  }

  createPersonnel(dto: Record<string, unknown>): Observable<Record<string, unknown>> {
    return this.http.post<Record<string, unknown>>(`${this.apiUrl}${API.PERSONNEL}`, dto);
  }

  updatePersonnel(id: string, dto: Record<string, unknown>): Observable<Record<string, unknown>> {
    return this.http.patch<Record<string, unknown>>(`${this.apiUrl}${API.PERSONNEL}/${id}`, dto);
  }

  deletePersonnel(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${API.PERSONNEL}/${id}`);
  }
}
