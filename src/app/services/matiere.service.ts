import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Matiere } from '../models/matiere';
import { environment } from '../../environments/environment';
import { API } from '../core/api-routes';
import { PageResponse } from '../core/models/page.models';
import { toHttpParams } from '../core/http.utils';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  listMatieres(page = 0, size = 100): Observable<PageResponse<Matiere>> {
    return this.http.get<PageResponse<Matiere>>(`${this.apiUrl}${API.MATIERES}`, {
      params: toHttpParams({ page, size })
    });
  }

  getMatieresByClasse(classeId: string): Observable<Matiere[]> {
    return this.http.get<Matiere[]>(`${this.apiUrl}${API.MATIERES}`, {
      params: toHttpParams({ classeId })
    });
  }

  createMatiere(dto: Partial<Matiere>): Observable<Matiere> {
    return this.http.post<Matiere>(`${this.apiUrl}${API.MATIERES}`, dto);
  }

  updateMatiere(id: string, dto: Partial<Matiere>): Observable<Matiere> {
    return this.http.put<Matiere>(`${this.apiUrl}${API.MATIERES}/${id}`, dto);
  }

  deleteMatiere(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${API.MATIERES}/${id}`);
  }
}
