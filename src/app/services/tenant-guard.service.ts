import { Injectable } from '@angular/core';
import { IS_PLATFORM_KEY, TENANT_ID_KEY } from '../core/token.constants';

@Injectable({ providedIn: 'root' })
export class TenantGuardService {
  hasTenant(): boolean {
    const tenantId = localStorage.getItem(TENANT_ID_KEY);
    const isPlatform = localStorage.getItem(IS_PLATFORM_KEY) === 'true';
    return !!tenantId && !isPlatform;
  }
}
