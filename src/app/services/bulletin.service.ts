import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Bulletin } from '../models/bulletin';
import { environment } from '../../environments/environment';
import { API } from '../core/api-routes';
import { toHttpParams } from '../core/http.utils';

@Injectable({
  providedIn: 'root'
})
export class BulletinService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  listBulletins(eleveId?: string, anneeId?: string, classeId?: string, trimestre?: string): Observable<Bulletin[]> {
    return this.http.get<{ content?: Bulletin[] } | Bulletin[]>(`${this.apiUrl}${API.BULLETINS}`, {
      params: toHttpParams({ eleveId, anneeId, classeId, trimestre })
    }).pipe(
      map((response) => Array.isArray(response) ? response : response.content ?? [])
    );
  }

  listBulletinsEleve(eleveId: string, anneeId?: string, trimestre?: string): Observable<Bulletin[]> {
    return this.listBulletins(eleveId, anneeId, undefined, trimestre);
  }

  listBulletinsClasse(classeId: string, anneeId?: string, trimestre?: string): Observable<Bulletin[]> {
    return this.listBulletins(undefined, anneeId, classeId, trimestre);
  }

  genererBulletinEleve(payload: {
    eleveId: string;
    classeId?: string;
    trimestre?: string;
    anneeScolaire?: string;
  }): Observable<Bulletin> {
    return this.http.post<Bulletin>(`${this.apiUrl}${API.BULLETINS}`, payload);
  }

  genererBulletinsClasse(payload: {
    classeId: string;
    trimestre?: string;
    anneeScolaire?: string;
    anneeAcademiqueId?: string;
  }): Observable<Bulletin[]> {
    return this.http.post<Bulletin[]>(`${this.apiUrl}${API.BULLETINS}/generer`, payload);
  }

  telechargerBulletin(id: string): Observable<{ id: string; format: string; url: string; fichierPdfUrl: string }> {
    return this.http.get<{ id: string; format: string; url: string; fichierPdfUrl: string }>(
      `${this.apiUrl}${API.BULLETINS}/${id}/download`
    );
  }

  genererLienBulletin(bulletinId: string, parentId?: string): Observable<{ token: string; url: string }> {
    return this.http.post<{ token: string; url: string }>(
      `${this.apiUrl}${API.LIENS_BULLETIN}/generer`,
      { bulletinId, parentId }
    );
  }

  genererLienBulletinEleve(eleveId: string, trimestre?: string): Observable<{ token: string; url: string }> {
    return this.http.post<{ token: string; url: string }>(
      `${this.apiUrl}${API.LIENS_BULLETIN}/generer`,
      { eleveId, trimestre }
    );
  }

  consulterBulletinParToken(token: string): Observable<Bulletin> {
    return this.http.get<Bulletin>(`${this.apiUrl}${API.LIENS_BULLETIN}/${token}/consulter`);
  }

  verifierOtpBulletin(token: string, otp: string): Observable<Bulletin> {
    return this.http.post<Bulletin>(`${this.apiUrl}${API.LIENS_BULLETIN}/${token}/verifier-otp`, { otp });
  }

  /** @deprecated Utiliser listBulletinsEleve ou listBulletinsClasse selon le contexte. */
  listBulletinsLegacy(eleveId?: string, anneeId?: string): Observable<Bulletin[]> {
    return this.http.get<Bulletin[]>(`${this.apiUrl}${API.BULLETINS}`, {
      params: toHttpParams({ eleveId, anneeId })
    });
  }

  getBulletin(id: string): Observable<Bulletin> {
    return this.http.get<Bulletin>(`${this.apiUrl}${API.BULLETINS}/${id}`);
  }

}
