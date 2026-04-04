import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthMeDto, ChangePasswordRequest } from '../core/models/auth.models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {
  constructor(private readonly authService: AuthService) {}

  getMe(): Observable<AuthMeDto> {
    return this.authService.getMe();
  }

  changePassword(request: ChangePasswordRequest): Observable<void> {
    return this.authService.changePassword(request);
  }
}
