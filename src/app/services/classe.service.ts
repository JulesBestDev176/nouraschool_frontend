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
    return this.http.get<PageResponse<any> | any[]>(`${this.apiUrl}${API.CLASSES}`, {
      params: toHttpParams({ page, size })
    }).pipe(
      map((response) => Array.isArray(response)
        ? {
            content: response.map((item) => this.fromApi(item)),
            page,
            size,
            totalElements: response.length,
            totalPages: 1
          }
        : {
            ...response,
            content: (response.content ?? []).map((item: any) => this.fromApi(item))
          })
    );
  }

  getClasse(id: string): Observable<Classe> {
    return this.http.get<any>(`${this.apiUrl}${API.CLASSES}/${id}`).pipe(
      map((item) => this.fromApi(item))
    );
  }

  createClasse(dto: Record<string, unknown>): Observable<Classe> {
    return this.http.post<any>(`${this.apiUrl}${API.CLASSES}`, this.toApi(dto)).pipe(
      map((item) => this.fromApi(item))
    );
  }

  updateClasse(id: string, dto: Record<string, unknown>): Observable<Classe> {
    return this.http.put<any>(`${this.apiUrl}${API.CLASSES}/${id}`, this.toApi(dto)).pipe(
      map((item) => this.fromApi(item))
    );
  }

  deleteClasse(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${API.CLASSES}/${id}`);
  }

  private fromApi(item: any): Classe {
    return {
      id: String(item.id),
      nom: item.nom ?? '',
      niveau: item.niveau?.libelle ?? item.niveau?.code ?? item.niveauId ?? '',
      enseignantPrincipalId: '',
      elevesIds: item.elevesIds ?? [],
      nombreMaxEleves: Number(item.effectifMax ?? 0),
      matieres: item.matieres ?? [],
      salle: item.salle?.nom ?? item.salleClasse ?? item.salleId ?? '',
      horaires: item.horaires,
      niveauId: item.niveauId ?? item.niveau?.id ?? '',
      anneeAcademiqueId: item.anneeAcademiqueId ?? item.anneeAcademique?.id ?? '',
      anneeScolaire: item.anneeAcademique?.libelle ?? item.anneeScolaire ?? '',
      salleId: item.salleId ?? item.salle?.id ?? '',
      effectifMax: Number(item.effectifMax ?? 0),
      salleClasse: item.salle?.nom ?? item.salleClasse ?? ''
    } as Classe & Record<string, unknown>;
  }

  private toApi(dto: Record<string, unknown>): Record<string, unknown> {
    return {
      nom: dto['nom'],
      niveauId: dto['niveauId'] ?? dto['niveau'],
      anneeAcademiqueId: dto['anneeAcademiqueId'] ?? dto['anneeScolaire'],
      salleId: dto['salleId'] ?? dto['salleClasse'],
      effectifMax: dto['effectifMax'] ?? dto['nombreMaxEleves']
    };
  }
}
