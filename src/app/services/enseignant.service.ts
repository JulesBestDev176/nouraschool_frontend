import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Enseignant } from '../models/enseignant';
import { environment } from '../../environments/environment';
import { API } from '../core/api-routes';
import { PageResponse } from '../core/models/page.models';
import { toHttpParams } from '../core/http.utils';

@Injectable({
  providedIn: 'root'
})
export class EnseignantService {
  private readonly baseUrl = `${environment.apiUrl}${API.ENSEIGNANTS}`;

  constructor(private readonly http: HttpClient) { }

  listEnseignants(page = 0, size = 20): Observable<PageResponse<Enseignant>> {
    return this.http.get<PageResponse<Enseignant> | Enseignant[]>(`${this.baseUrl}`, {
      params: toHttpParams({ page, size })
    }).pipe(
      map((response) => Array.isArray(response)
        ? {
          content: response,
          page,
          size,
          totalElements: response.length,
          totalPages: 1
        }
        : response)
    );
  }

  getEnseignant(id: string): Observable<Enseignant> {
    return this.http.get<Enseignant>(`${this.baseUrl}/${id}`);
  }

  createEnseignant(dto: Partial<Enseignant>): Observable<Enseignant> {
    return this.http.post<Enseignant>(`${this.baseUrl}`, dto);
  }

  updateEnseignant(id: string, dto: Partial<Enseignant>): Observable<Enseignant> {
    return this.http.patch<Enseignant>(`${this.baseUrl}/${id}`, dto);
  }
}
