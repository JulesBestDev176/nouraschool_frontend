import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { Parent } from '../models/parent';
import { environment } from '../../environments/environment';
import { API } from '../core/api-routes';
import { PageResponse } from '../core/models/page.models';
import { toHttpParams } from '../core/http.utils';
import { TenantGuardService } from './tenant-guard.service';

@Injectable({ providedIn: 'root' })
export class ParentService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient, private readonly tenantGuard: TenantGuardService) {}

  listParents(page = 0, size = 20): Observable<PageResponse<Parent>> {
    if (!this.tenantGuard.hasTenant()) {
      return of({ content: [], page, size, totalElements: 0, totalPages: 0 });
    }
    return this.http.get<PageResponse<Parent> | Parent[]>(`${this.apiUrl}${API.PARENTS}`, {
      params: toHttpParams({ page, size })
    }).pipe(
      map((response) => Array.isArray(response)
        ? { content: response.map((p) => this.fromApi(p)), page, size, totalElements: response.length, totalPages: 1 }
        : { ...response, content: (response.content ?? []).map((p) => this.fromApi(p)) })
    );
  }

  getParent(id: string): Observable<Parent> {
    return this.http.get<Parent>(`${this.apiUrl}${API.PARENTS}/${id}`).pipe(
      map((parent) => this.fromApi(parent))
    );
  }

  createParent(dto: Partial<Parent>): Observable<Parent> {
    const { id, ...body } = this.toCreateApi(dto) as any;
    return this.http.post<Parent>(`${this.apiUrl}${API.PARENTS}`, body).pipe(
      map((parent) => this.fromApi(parent))
    );
  }

  updateParent(id: string, dto: Partial<Parent>): Observable<Parent> {
    return this.http.patch<Parent>(`${this.apiUrl}${API.PARENTS}/${id}`, this.toUpdateApi(dto)).pipe(
      map((parent) => this.fromApi(parent))
    );
  }

  private fromApi(parent: any): Parent {
    return {
      id: String(parent.id),
      nom: parent.lastName ?? parent.nom ?? '',
      prenom: parent.firstName ?? parent.prenom ?? '',
      email: parent.email ?? '',
      telephone: parent.telephone ?? '',
      adresse: parent.adresse ?? '',
      profession: parent.profession ?? '',
      enfantIds: parent.enfantIds ?? [],
      statut: parent.active === false ? 'inactif' : (parent.statut ?? 'actif')
    };
  }

  private toCreateApi(dto: Partial<Parent>): Record<string, unknown> {
    const email = String(dto.email ?? '').trim();
    const prenom = String(dto.prenom ?? '').trim();
    const nom = String(dto.nom ?? '').trim();
    return {
      email,
      firstName: prenom,
      lastName: nom,
      telephone: dto.telephone ?? '',
      adresse: dto.adresse ?? '',
      profession: dto.profession ?? ''
    };
  }

  private toUpdateApi(dto: Partial<Parent>): Record<string, unknown> {
    return {
      firstName: dto.prenom,
      lastName: dto.nom,
      email: dto.email,
      telephone: dto.telephone,
      adresse: dto.adresse,
      profession: dto.profession,
      active: dto.statut ? dto.statut === 'actif' : undefined
    };
  }
}
