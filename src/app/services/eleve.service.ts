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
      username: eleve.username ?? '',

      firstName: eleve.firstName ?? '',
      lastName: eleve.lastName ?? '',

      email: eleve.email ?? '',
      telephone: eleve.telephone ?? '',

      dateNaissance: eleve.dateNaissance ?? null,

      adresse: eleve.adresse ?? '',
      lieuNaissance: eleve.lieuNaissance ?? '',
      genre: eleve.genre,

      sexe: eleve.genre === 'MASCULIN'
        ? 'M'
        : eleve.genre === 'FEMININ'
          ? 'F'
          : eleve.sexe,

      active: eleve.active !== false,
      matricule: eleve.matricule ?? '',
      numeroUrgence: eleve.numeroUrgence ?? '',
      dateInscription: eleve.dateInscription ?? null,
      photoUrl: eleve.photoUrl ?? '',

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
      username: this.cleanString(dto.username) || email || `${firstName}.${lastName}`.toLowerCase(),
      email,
      firstName: firstName,
      lastName: lastName,
      telephone: this.cleanString(dto.telephone),
      adresse: this.cleanString(dto.adresse),
      matricule: this.cleanString(dto.matricule),
      dateNaissance: this.toDateOnly(dto.dateNaissance),
      lieuNaissance: this.cleanString(dto.lieuNaissance),
      genre: this.toApiGenre(dto),
      numeroUrgence: this.cleanString(dto.numeroUrgence),
      dateInscription: this.toDateOnly(dto.dateInscription),
      photoUrl: this.cleanString(dto.photoUrl),
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
      active: dto.active ?? (dto.statut ? dto.statut === 'actif' : undefined),
      matricule: dto.matricule,
      dateNaissance: this.toDateOnly(dto.dateNaissance),
      lieuNaissance: dto.lieuNaissance,
      genre: this.toApiGenre(dto),
      numeroUrgence: dto.numeroUrgence,
      dateInscription: this.toDateOnly(dto.dateInscription),
      photoUrl: dto.photoUrl,
      parentIds: dto.parentIds,
      classeId: dto.classeId || undefined
    };
  }

  private toApiGenre(dto: Partial<Eleve>): 'MASCULIN' | 'FEMININ' | undefined {
    if (dto.genre === 'MASCULIN' || dto.genre === 'FEMININ') {
      return dto.genre;
    }
    return dto.sexe === 'M' ? 'MASCULIN' : dto.sexe === 'F' ? 'FEMININ' : undefined;
  }

  private toDateOnly(value: Date | string | null | undefined): string | undefined {
    if (!value) {
      return undefined;
    }
    if (value instanceof Date) {
      const year = value.getFullYear();
      const month = String(value.getMonth() + 1).padStart(2, '0');
      const day = String(value.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return String(value).slice(0, 10);
  }

  private cleanString(value: unknown): string | undefined {
    const cleaned = String(value ?? '').trim();
    return cleaned || undefined;
  }
}
