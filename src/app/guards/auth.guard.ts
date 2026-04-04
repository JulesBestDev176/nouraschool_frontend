import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { TOKEN_KEY } from '../core/token.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private readonly router: Router) {}

  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
