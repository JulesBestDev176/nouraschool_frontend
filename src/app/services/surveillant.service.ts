import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { API } from '../core/api-routes';
import { toHttpParams } from '../core/http.utils';

@Injectable({
  providedIn: 'root'
})
export class SurveillantService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  listAbsencesEleve(eleveId?: string): Observable<Record<string, unknown>[]> {
    return this.http.get<Record<string, unknown>[]>(`${this.apiUrl}${API.ABSENCES_ELEVE}`, {
      params: toHttpParams({ eleveId })
    });
  }

  createAbsenceEleve(dto: Record<string, unknown>): Observable<Record<string, unknown>> {
    return this.http.post<Record<string, unknown>>(`${this.apiUrl}${API.ABSENCES_ELEVE}`, dto);
  }

  approuverAbsence(id: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}${API.ABSENCES_ELEVE}/${id}/approuver`, {});
  }

  rejeterAbsence(id: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}${API.ABSENCES_ELEVE}/${id}/rejeter`, {});
  }

  listConvocations(): Observable<Record<string, unknown>[]> {
    return this.http.get<Record<string, unknown>[]>(`${this.apiUrl}${API.CONVOCATIONS}`);
  }

  createConvocation(dto: Record<string, unknown>): Observable<Record<string, unknown>> {
    return this.http.post<Record<string, unknown>>(`${this.apiUrl}${API.CONVOCATIONS}`, dto);
  }

  ajouterCompteRendu(id: string, dto: Record<string, unknown>): Observable<Record<string, unknown>> {
    return this.http.patch<Record<string, unknown>>(`${this.apiUrl}${API.CONVOCATIONS}/${id}/compte-rendu`, dto);
  }
}
