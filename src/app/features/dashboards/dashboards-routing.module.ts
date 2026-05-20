import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { RoleGuard } from '../../guards/role.guard';

const ADMIN_ROLES = ['ADMIN', 'SUPER_ADMIN'];

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ADMIN_ROLES },
    loadChildren: () => import('../pages/dashboard-admin-page/dashboard-admin-page.module').then((m) => m.DashboardAdminPageModule),
  },
  {
    path: 'enseignant',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ENSEIGNANT'] },
    loadChildren: () => import('../pages/dashboard-enseignant-page/dashboard-enseignant-page.module').then((m) => m.DashboardEnseignantPageModule),
  },
  {
    path: 'eleve',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ELEVE'] },
    loadChildren: () => import('../pages/dashboard-eleve-page/dashboard-eleve-page.module').then((m) => m.DashboardElevePageModule),
  },
  {
    path: 'parent',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['PARENT'] },
    loadChildren: () => import('../pages/dashboard-parent-page/dashboard-parent-page.module').then((m) => m.DashboardParentPageModule),
  },
  {
    path: 'caisse',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['CAISSIER', ...ADMIN_ROLES] },
    loadChildren: () => import('../pages/caisse-page/caisse-page.module').then((m) => m.CaissePageModule),
  },
  {
    path: 'surveillant',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['SURVEILLANT', ...ADMIN_ROLES] },
    loadChildren: () => import('../pages/surveillant-page/surveillant-page.module').then((m) => m.SurveillantPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardsRoutingModule {}
