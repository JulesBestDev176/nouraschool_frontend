import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../models/note';
import { environment } from '../../environments/environment';
import { API } from '../core/api-routes';
import { toHttpParams } from '../core/http.utils';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  listNotes(eleveId?: string, matiereId?: string): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}${API.NOTES}`, {
      params: toHttpParams({ eleveId, matiereId })
    });
  }

  createNote(dto: Partial<Note>): Observable<Note> {
    return this.http.post<Note>(`${this.apiUrl}${API.NOTES}`, dto);
  }

  updateNote(id: string, dto: Partial<Note>): Observable<Note> {
    return this.http.put<Note>(`${this.apiUrl}${API.NOTES}/${id}`, dto);
  }

  deleteNote(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${API.NOTES}/${id}`);
  }
}
