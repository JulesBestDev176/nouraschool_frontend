import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { IS_PLATFORM_KEY, TENANT_ID_KEY, TOKEN_KEY } from '../core/token.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private readonly router: Router) {}

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    return this.checkAccess(state.url);
  }

  canActivateChild(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    return this.checkAccess(state.url);
  }

  private checkAccess(returnUrl: string): boolean | UrlTree {
    const token = localStorage.getItem(TOKEN_KEY);
    const tenantId = localStorage.getItem(TENANT_ID_KEY);
    const isPlatform = localStorage.getItem(IS_PLATFORM_KEY) === 'true';
    if (!token || (!tenantId && !isPlatform)) {
      return this.router.createUrlTree(['/login'], { queryParams: { returnUrl } });
    }
    return true;
  }
}
