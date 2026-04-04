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
export class AnnonceService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  listAnnonces(page = 0, size = 20): Observable<PageResponse<Record<string, unknown>>> {
    return this.http.get<PageResponse<Record<string, unknown>>>(`${this.apiUrl}${API.ANNONCES}`, {
      params: toHttpParams({ page, size })
    });
  }

  createAnnonce(dto: Record<string, unknown>): Observable<Record<string, unknown>> {
    return this.http.post<Record<string, unknown>>(`${this.apiUrl}${API.ANNONCES}`, dto);
  }

  updateAnnonce(id: string, dto: Record<string, unknown>): Observable<Record<string, unknown>> {
    return this.http.patch<Record<string, unknown>>(`${this.apiUrl}${API.ANNONCES}/${id}`, dto);
  }

  deleteAnnonce(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${API.ANNONCES}/${id}`);
  }
}
