import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbsenceEleveComponent } from '../../components/absence-eleve/absence-eleve.component';
import { ConvocationComponent } from '../../components/convocation/convocation.component';
import { AuthGuard } from '../../guards/auth.guard';
import { RoleGuard } from '../../guards/role.guard';

const ADMIN_ROLES = ['ADMIN', 'SUPER_ADMIN'];

const routes: Routes = [
  { path: 'absences', component: AbsenceEleveComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['SURVEILLANT', ...ADMIN_ROLES] } },
  { path: 'convocations', component: ConvocationComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['SURVEILLANT', ...ADMIN_ROLES] } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveillantRoutingModule {}
