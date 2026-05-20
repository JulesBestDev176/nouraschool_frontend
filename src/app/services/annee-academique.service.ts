import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { API } from '../core/api-routes';
import { toHttpParams } from '../core/http.utils';
import { AnneeAcademique } from '../models/annee-academique';
import { TenantGuardService } from './tenant-guard.service';

@Injectable({ providedIn: 'root' })
export class AnneeAcademiqueService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient, private readonly tenantGuard: TenantGuardService) {}

  listAnnees(page = 0, size = 20): Observable<Record<string, unknown>> {
    if (!this.tenantGuard.hasTenant()) {
      return of({ content: [], page, size, totalElements: 0, totalPages: 0 });
    }
    return this.http.get<Record<string, unknown>>(`${this.apiUrl}${API.ANNEES}`, {
      params: toHttpParams({ page, size })
    });
  }

  getCourante(): Observable<AnneeAcademique> {
    if (!this.tenantGuard.hasTenant()) {
      return of({} as AnneeAcademique);
    }
    return this.http.get<AnneeAcademique>(`${this.apiUrl}${API.ANNEES}/courante`);
  }

  createAnnee(dto: Record<string, unknown>): Observable<Record<string, unknown>> {
    return this.http.post<Record<string, unknown>>(`${this.apiUrl}${API.ANNEES}`, dto);
  }

  activerAnnee(id: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}${API.ANNEES}/${id}/activer`, {});
  }
}
