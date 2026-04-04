import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { API } from '../core/api-routes';

@Injectable({
  providedIn: 'root'
})
export class AbsencePersonnelService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  list(): Observable<Record<string, unknown>[]> {
    return this.http.get<Record<string, unknown>[]>(`${this.apiUrl}${API.ABSENCES_PERSONNEL}`);
  }

  create(dto: Record<string, unknown>): Observable<Record<string, unknown>> {
    return this.http.post<Record<string, unknown>>(`${this.apiUrl}${API.ABSENCES_PERSONNEL}`, dto);
  }

  update(id: string, dto: Record<string, unknown>): Observable<Record<string, unknown>> {
    return this.http.patch<Record<string, unknown>>(`${this.apiUrl}${API.ABSENCES_PERSONNEL}/${id}`, dto);
  }

  validate(id: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}${API.ABSENCES_PERSONNEL}/${id}/valider`, {});
  }

  reject(id: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}${API.ABSENCES_PERSONNEL}/${id}/rejeter`, {});
  }
}
