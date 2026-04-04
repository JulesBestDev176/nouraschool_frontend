import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { API } from '../core/api-routes';
import { PageResponse } from '../core/models/page.models';
import { toHttpParams } from '../core/http.utils';
import { Inscription } from '../models/inscription';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  listInscriptions(page = 0, size = 20): Observable<PageResponse<Inscription>> {
    return this.http.get<PageResponse<Inscription> | Inscription[]>(`${this.apiUrl}${API.INSCRIPTIONS}`, {
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

  getInscription(id: string): Observable<Inscription> {
    return this.http.get<Inscription>(`${this.apiUrl}${API.INSCRIPTIONS}/${id}`);
  }

  createInscription(dto: {
    eleveId: string;
    classeId: string;
    anneeAcademiqueId: string;
    parentIds?: string[];
  }): Observable<Inscription> {
    return this.http.post<Inscription>(`${this.apiUrl}${API.INSCRIPTIONS}`, dto);
  }

  transfererInscription(id: string, classeId: string): Observable<Inscription> {
    return this.http.patch<Inscription>(`${this.apiUrl}${API.INSCRIPTIONS}/${id}/transferer`, { classeId });
  }

  deleteInscription(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${API.INSCRIPTIONS}/${id}`);
  }

  findById(id: string): Observable<Inscription> {
    return this.getInscription(id);
  }

  create(dto: {
    eleveId: string;
    classeId: string;
    anneeAcademiqueId: string;
    parentIds?: string[];
  }): Observable<Inscription> {
    return this.createInscription(dto);
  }

  transferer(id: string, classeId: string): Observable<Inscription> {
    return this.transfererInscription(id, classeId);
  }

  delete(id: string): Observable<void> {
    return this.deleteInscription(id);
  }
}
