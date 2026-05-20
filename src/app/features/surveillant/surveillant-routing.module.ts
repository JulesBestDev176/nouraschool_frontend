import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { RoleGuard } from '../../guards/role.guard';

const ADMIN_ROLES = ['ADMIN', 'SUPER_ADMIN'];

const routes: Routes = [
  {
    path: 'absences',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['SURVEILLANT', ...ADMIN_ROLES] },
    loadChildren: () => import('../pages/absence-eleve-page/absence-eleve-page.module').then((m) => m.AbsenceElevePageModule),
  },
  {
    path: 'convocations',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['SURVEILLANT', ...ADMIN_ROLES] },
    loadChildren: () => import('../pages/convocation-page/convocation-page.module').then((m) => m.ConvocationPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveillantRoutingModule {}
