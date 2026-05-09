import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Eleve } from '../models/eleve';
import { environment } from '../../environments/environment';
import { API } from '../core/api-routes';
import { PageResponse } from '../core/models/page.models';
import { toHttpParams } from '../core/http.utils';

@Injectable({
  providedIn: 'root'
})
export class EleveService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }

  listEleves(page = 0, size = 20, classeId?: string): Observable<PageResponse<Eleve>> {
    return this.http.get<PageResponse<Eleve> | Eleve[]>(`${this.apiUrl}${API.ELEVES}`, {
      params: toHttpParams({ page, size, classeId })
    }).pipe(
      map((response) => Array.isArray(response)
        ? {
          content: response.map((e) => this.fromApi(e)),
          page,
          size,
          totalElements: response.length,
          totalPages: 1
        }
        : {
          ...response,
          content: (response.content ?? []).map((e) => this.fromApi(e))
        })
    );
  }

  getEleve(id: string): Observable<Eleve> {
    return this.http.get<Eleve>(`${this.apiUrl}${API.ELEVES}/${id}`).pipe(
      map((eleve) => this.fromApi(eleve))
    );
  }

  createEleve(dto: Partial<Eleve>): Observable<Eleve> {
    return this.http.post<Eleve>(`${this.apiUrl}${API.ELEVES}`, this.toCreateApi(dto)).pipe(
      map((eleve) => this.fromApi(eleve))
    );
  }

  updateEleve(id: string, dto: Partial<Eleve>): Observable<Eleve> {
    return this.http.patch<Eleve>(`${this.apiUrl}${API.ELEVES}/${id}`, this.toUpdateApi(dto)).pipe(
      map((eleve) => this.fromApi(eleve))
    );
  }

  deleteEleve(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${API.ELEVES}/${id}`);
  }

  private fromApi(eleve: any): Eleve {
    return {
      id: String(eleve.id),

      firstName: eleve.firstName ?? eleve.firstName ?? '',
      lastName: eleve.lastName ?? eleve.lastName ?? '',

      email: eleve.email ?? '',
      telephone: eleve.telephone ?? '',

      dateNaissance: eleve.dateNaissance ?? null,

      adresse: eleve.adresse ?? '',
      lieuNaissance: eleve.lieuNaissance ?? '',

      sexe: eleve.genre === 'MASCULIN'
        ? 'M'
        : eleve.genre === 'FEMININ'
          ? 'F'
          : eleve.sexe,

      cycle: eleve.cycle,

      classeId: eleve.classeId ?? '',

      parentIds: eleve.parentIds ?? [],

      statut: eleve.active === false ? 'inactif' : 'actif',

      moyenneAnnuelle: eleve.moyenneAnnuelle,

      generatedUsername: eleve.generatedUsername,
      generatedPassword: eleve.generatedPassword
    } as Eleve;
  }

  private toCreateApi(dto: Partial<Eleve>): Record<string, unknown> {
    const email = String(dto.email ?? '').trim();
    const firstName = String(dto.firstName ?? '').trim();
    const lastName = String(dto.lastName ?? '').trim();
    return {
      username: email || `${firstName}.${lastName}`.toLowerCase(),
      email,
      password: 'Eleve123!',
      firstName: firstName,
      lastName: lastName,
      telephone: dto.telephone ?? '',
      adresse: dto.adresse ?? '',
      dateNaissance: dto.dateNaissance,
      lieuNaissance: dto.lieuNaissance ?? '',
      genre: dto.sexe === 'M' ? 'MASCULIN' : dto.sexe === 'F' ? 'FEMININ' : undefined,
      parentIds: dto.parentIds ?? [],
      classeId: dto.classeId || undefined
    };
  }

  private toUpdateApi(dto: Partial<Eleve>): Record<string, unknown> {
    return {
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      telephone: dto.telephone,
      adresse: dto.adresse,
      active: dto.statut ? dto.statut === 'actif' : undefined,
      dateNaissance: dto.dateNaissance,
      lieuNaissance: dto.lieuNaissance,
      genre: dto.sexe === 'M' ? 'MASCULIN' : dto.sexe === 'F' ? 'FEMININ' : undefined,
      parentIds: dto.parentIds,
      classeId: dto.classeId || undefined
    };
  }
}
