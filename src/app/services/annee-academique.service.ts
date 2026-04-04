import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { API } from '../core/api-routes';
import { toHttpParams } from '../core/http.utils';

@Injectable({
  providedIn: 'root'
})
export class AnneeAcademiqueService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  listAnnees(page = 0, size = 20): Observable<Record<string, unknown>> {
    return this.http.get<Record<string, unknown>>(`${this.apiUrl}${API.ANNEES}`, {
      params: toHttpParams({ page, size })
    });
  }

  getCourante(): Observable<Record<string, unknown>> {
    return this.http.get<Record<string, unknown>>(`${this.apiUrl}${API.ANNEES}/courante`);
  }

  createAnnee(dto: Record<string, unknown>): Observable<Record<string, unknown>> {
    return this.http.post<Record<string, unknown>>(`${this.apiUrl}${API.ANNEES}`, dto);
  }

  activerAnnee(id: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}${API.ANNEES}/${id}/activer`, {});
  }
}
