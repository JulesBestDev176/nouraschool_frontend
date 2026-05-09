import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Classe } from '../models/classe';
import { environment } from '../../environments/environment';
import { API } from '../core/api-routes';
import { PageResponse } from '../core/models/page.models';
import { toHttpParams } from '../core/http.utils';

@Injectable({
  providedIn: 'root'
})
export class ClasseService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }

  listClasses(page = 0, size = 50): Observable<PageResponse<Classe>> {
    return this.http.get<PageResponse<Classe> | Classe[]>(`${this.apiUrl}${API.CLASSES}`, {
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

  getClasse(id: string): Observable<Classe> {
    return this.http.get<Classe>(`${this.apiUrl}${API.CLASSES}/${id}`);
  }

  createClasse(dto: Partial<Classe>): Observable<Classe> {
    return this.http.post<Classe>(`${this.apiUrl}${API.CLASSES}`, dto);
  }

  updateClasse(id: string, dto: Partial<Classe>): Observable<Classe> {
    return this.http.put<Classe>(`${this.apiUrl}${API.CLASSES}/${id}`, dto);
  }

  deleteClasse(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${API.CLASSES}/${id}`);
  }
}
