import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { Classe } from '../models/classe';
import { environment } from '../../environments/environment';
import { API } from '../core/api-routes';
import { PageResponse } from '../core/models/page.models';
import { toHttpParams } from '../core/http.utils';
import { TenantGuardService } from './tenant-guard.service';

@Injectable({ providedIn: 'root' })
export class ClasseService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient, private readonly tenantGuard: TenantGuardService) {}

  listClasses(page = 0, size = 50): Observable<PageResponse<Classe>> {
    if (!this.tenantGuard.hasTenant()) {
      return of({ content: [], page, size, totalElements: 0, totalPages: 0 });
    }
    return this.http.get<PageResponse<Classe> | Classe[]>(`${this.apiUrl}${API.CLASSES}`, {
      params: toHttpParams({ page, size })
    }).pipe(
      map((response) => Array.isArray(response)
        ? { content: response, page, size, totalElements: response.length, totalPages: 1 }
        : response)
    );
  }

  getClasse(id: string): Observable<Classe> {
    return this.http.get<Classe>(`${this.apiUrl}${API.CLASSES}/${id}`);
  }

  createClasse(dto: Partial<Classe>): Observable<Classe> {
    const { id, ...body } = dto as any;
    return this.http.post<Classe>(`${this.apiUrl}${API.CLASSES}`, body);
  }

  updateClasse(id: string, dto: Partial<Classe>): Observable<Classe> {
    const { id: _id, ...body } = dto as any;
    return this.http.put<Classe>(`${this.apiUrl}${API.CLASSES}/${id}`, body);
  }

  deleteClasse(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${API.CLASSES}/${id}`);
  }
}
