import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaisseComponent } from '../../components/caisse/caisse.component';
import { DashboardAdminComponent } from '../../components/dashboard-admin/dashboard-admin.component';
import { DashboardEleveComponent } from '../../components/dashboard-eleve/dashboard-eleve.component';
import { DashboardEnseignantComponent } from '../../components/dashboard-enseignant/dashboard-enseignant.component';
import { DashboardParentComponent } from '../../components/dashboard-parent/dashboard-parent.component';
import { SurveillantComponent } from '../../components/surveillant/surveillant.component';
import { AuthGuard } from '../../guards/auth.guard';
import { RoleGuard } from '../../guards/role.guard';

const ADMIN_ROLES = ['ADMIN', 'SUPER_ADMIN'];

const routes: Routes = [
  { path: 'admin', component: DashboardAdminComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ADMIN_ROLES } },
  { path: 'enseignant', component: DashboardEnseignantComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['ENSEIGNANT'] } },
  { path: 'eleve', component: DashboardEleveComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['ELEVE'] } },
  { path: 'parent', component: DashboardParentComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['PARENT'] } },
  { path: 'caisse', component: CaisseComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['CAISSIER', ...ADMIN_ROLES] } },
  { path: 'surveillant', component: SurveillantComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['SURVEILLANT', ...ADMIN_ROLES] } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardsRoutingModule {}
