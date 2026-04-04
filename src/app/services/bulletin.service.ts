import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  listBulletins(eleveId?: string, anneeId?: string): Observable<Bulletin[]> {
    return this.http.get<Bulletin[]>(`${this.apiUrl}${API.BULLETINS}`, {
      params: toHttpParams({ eleveId, anneeId })
    });
  }

  getBulletin(id: string): Observable<Bulletin> {
    return this.http.get<Bulletin>(`${this.apiUrl}${API.BULLETINS}/${id}`);
  }

  genererLienBulletin(eleveId: string): Observable<{ token: string; url: string }> {
    return this.http.post<{ token: string; url: string }>(
      `${this.apiUrl}${API.LIENS_BULLETIN}/generer`,
      { eleveId }
    );
  }

  consulterBulletinParToken(token: string): Observable<Bulletin> {
    return this.http.get<Bulletin>(`${this.apiUrl}${API.LIENS_BULLETIN}/${token}/consulter`);
  }

  verifierOtpBulletin(token: string, otp: string): Observable<Bulletin> {
    return this.http.post<Bulletin>(`${this.apiUrl}${API.LIENS_BULLETIN}/${token}/verifier-otp`, { otp });
  }
}
