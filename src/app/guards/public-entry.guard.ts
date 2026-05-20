import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class PublicEntryGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  canActivate(): boolean | UrlTree {
    if (!this.authService.hasActiveSession()) {
      return true;
    }

    return this.router.createUrlTree([
      this.authService.getRoleDashboardUrl(this.authService.currentUserValue?.role),
    ]);
  }
}
