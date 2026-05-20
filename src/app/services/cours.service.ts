import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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
    return this.http.get<any[] | { content?: any[] }>(`${this.apiUrl}${API.COURS}`, {
      params: toHttpParams({ classeId })
    }).pipe(
      map((response) => Array.isArray(response) ? response : (response?.content ?? []))
    );
  }

  create(dto: Record<string, unknown>): Observable<Record<string, unknown>> {
    return this.http.post<Record<string, unknown>>(`${this.apiUrl}${API.COURS}`, this.toApi(dto));
  }

  update(id: string, dto: Record<string, unknown>): Observable<Record<string, unknown>> {
    return this.http.put<Record<string, unknown>>(`${this.apiUrl}${API.COURS}/${id}`, this.toApi(dto));
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${API.COURS}/${id}`);
  }

  private toApi(dto: Record<string, unknown>): Record<string, unknown> {
    return {
      matiereId: dto['matiereId'] ?? dto['titre'],
      classeId: dto['classeId'],
      enseignantId: dto['enseignantId'],
      anneeAcademiqueId: dto['anneeAcademiqueId'],
      volumeHoraireHebdo: dto['volumeHoraireHebdo'] ?? dto['heures'],
      coefficient: dto['coefficient']
    };
  }
}
