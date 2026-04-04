import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { AuthMeDto } from '../core/models/auth.models';
import { CURRENT_USER_KEY } from '../core/token.constants';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private readonly router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean {
    const rawUser = localStorage.getItem(CURRENT_USER_KEY);
    if (!rawUser) {
      this.router.navigate(['/login']);
      return false;
    }
    const user = JSON.parse(rawUser) as AuthMeDto;
    const allowedRoles = (route.data['roles'] ?? []) as string[];
    if (!allowedRoles.length || allowedRoles.includes(user.role)) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
