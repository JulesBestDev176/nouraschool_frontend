import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { API } from '../core/api-routes';
import { toHttpParams } from '../core/http.utils';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  listTenants(page = 0, size = 20): Observable<Record<string, unknown>> {
    return this.http.get<Record<string, unknown>>(`${this.apiUrl}${API.PLATFORM.TENANTS}`, {
      params: toHttpParams({ page, size })
    });
  }

  getPlatformStats(): Observable<Record<string, unknown>> {
    return this.http.get<Record<string, unknown>>(`${this.apiUrl}${API.PLATFORM.STATS}`);
  }

  listPlatformUsers(page = 0, size = 20): Observable<Record<string, unknown>> {
    return this.http.get<Record<string, unknown>>(`${this.apiUrl}${API.PLATFORM.USERS}`, {
      params: toHttpParams({ page, size })
    });
  }
}
