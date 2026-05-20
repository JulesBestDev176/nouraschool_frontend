import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { AuthMeDto } from '../core/models/auth.models';
import { CURRENT_USER_KEY } from '../core/token.constants';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanActivateChild {
  constructor(private readonly router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean | UrlTree {
    return this.checkRole(route);
  }

  canActivateChild(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean | UrlTree {
    return this.checkRole(route);
  }

  private checkRole(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const rawUser = localStorage.getItem(CURRENT_USER_KEY);
    if (!rawUser) {
      return this.router.createUrlTree(['/login']);
    }

    let user: AuthMeDto;
    try {
      user = JSON.parse(rawUser) as AuthMeDto;
    } catch {
      localStorage.removeItem(CURRENT_USER_KEY);
      return this.router.createUrlTree(['/login']);
    }

    const allowedRoles = (route.data['roles'] ?? []) as string[];
    if (!allowedRoles.length || allowedRoles.includes(user.role)) {
      return true;
    }
    return this.router.createUrlTree(['/']);
  }
}
