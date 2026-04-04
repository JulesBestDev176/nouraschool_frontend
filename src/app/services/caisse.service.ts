import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paiement } from '../models/paiement';
import { environment } from '../../environments/environment';
import { API } from '../core/api-routes';
import { PageResponse } from '../core/models/page.models';
import { toHttpParams } from '../core/http.utils';

@Injectable({
  providedIn: 'root'
})
export class CaisseService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  listPaiements(page = 0, size = 20): Observable<PageResponse<Paiement>> {
    return this.http.get<PageResponse<Paiement>>(`${this.apiUrl}${API.PAIEMENTS}`, {
      params: toHttpParams({ page, size })
    });
  }

  getPaiement(id: string): Observable<Paiement> {
    return this.http.get<Paiement>(`${this.apiUrl}${API.PAIEMENTS}/${id}`);
  }

  createPaiement(dto: Partial<Paiement>): Observable<Paiement> {
    return this.http.post<Paiement>(`${this.apiUrl}${API.PAIEMENTS}`, dto);
  }

  updatePaiement(id: string, dto: Partial<Paiement>): Observable<Paiement> {
    return this.http.put<Paiement>(`${this.apiUrl}${API.PAIEMENTS}/${id}`, dto);
  }

  deletePaiement(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${API.PAIEMENTS}/${id}`);
  }

  genererLienPaiement(dto: Record<string, unknown>): Observable<Record<string, unknown>> {
    return this.http.post<Record<string, unknown>>(`${this.apiUrl}${API.LIENS_PAIEMENT}/generer`, dto);
  }

  detailLienPaiement(token: string): Observable<Record<string, unknown>> {
    return this.http.get<Record<string, unknown>>(`${this.apiUrl}${API.LIENS_PAIEMENT}/${token}/detail`);
  }

  payerParLien(token: string, dto: Record<string, unknown>): Observable<Record<string, unknown>> {
    return this.http.post<Record<string, unknown>>(`${this.apiUrl}${API.LIENS_PAIEMENT}/${token}/payer`, dto);
  }
}
