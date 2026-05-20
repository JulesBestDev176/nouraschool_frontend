import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { RoleGuard } from '../../guards/role.guard';

const ADMIN_ROLES = ['ADMIN', 'SUPER_ADMIN'];
const RH_ROLES = ['ADMIN', 'RH', 'SUPER_ADMIN'];

const routes: Routes = [
  { path: 'eleves', canActivate: [AuthGuard, RoleGuard], data: { roles: ADMIN_ROLES }, loadChildren: () => import('../pages/eleve-page/eleve-page.module').then((m) => m.ElevePageModule) },
  { path: 'classes', canActivate: [AuthGuard, RoleGuard], data: { roles: ADMIN_ROLES }, loadChildren: () => import('../pages/classe-page/classe-page.module').then((m) => m.ClassePageModule) },
  { path: 'inscriptions', canActivate: [AuthGuard, RoleGuard], data: { roles: ADMIN_ROLES }, loadChildren: () => import('../pages/inscription-page/inscription-page.module').then((m) => m.InscriptionPageModule) },
  { path: 'parents', canActivate: [AuthGuard, RoleGuard], data: { roles: ADMIN_ROLES }, loadChildren: () => import('../pages/parent-page/parent-page.module').then((m) => m.ParentPageModule) },
  { path: 'enseignants', canActivate: [AuthGuard, RoleGuard], data: { roles: ADMIN_ROLES }, loadChildren: () => import('../pages/enseignant-page/enseignant-page.module').then((m) => m.EnseignantPageModule) },
  { path: 'personnel', canActivate: [AuthGuard, RoleGuard], data: { roles: RH_ROLES }, loadChildren: () => import('../pages/personnel-page/personnel-page.module').then((m) => m.PersonnelPageModule) },
  { path: 'pointages', canActivate: [AuthGuard, RoleGuard], data: { roles: RH_ROLES }, loadChildren: () => import('../pages/pointage-page/pointage-page.module').then((m) => m.PointagePageModule) },
  { path: 'absences-personnel', canActivate: [AuthGuard, RoleGuard], data: { roles: RH_ROLES }, loadChildren: () => import('../pages/absence-personnel-page/absence-personnel-page.module').then((m) => m.AbsencePersonnelPageModule) },
  { path: 'cours', canActivate: [AuthGuard, RoleGuard], data: { roles: ADMIN_ROLES }, loadChildren: () => import('../pages/cours-page/cours-page.module').then((m) => m.CoursPageModule) },
  { path: 'emplois-du-temps', canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN', 'ENSEIGNANT', 'SUPER_ADMIN'] }, loadChildren: () => import('../pages/emploi-du-temps-page/emploi-du-temps-page.module').then((m) => m.EmploiDuTempsPageModule) },
  { path: 'notes', canActivate: [AuthGuard, RoleGuard], data: { roles: ADMIN_ROLES }, loadChildren: () => import('../pages/note-page/note-page.module').then((m) => m.NotePageModule) },
  { path: 'bulletins', canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN', 'ENSEIGNANT', 'SUPER_ADMIN'] }, loadChildren: () => import('../pages/bulletin-page/bulletin-page.module').then((m) => m.BulletinPageModule) },
  { path: 'reclamations', canActivate: [AuthGuard, RoleGuard], data: { roles: ADMIN_ROLES }, loadChildren: () => import('../pages/reclamation-page/reclamation-page.module').then((m) => m.ReclamationPageModule) },
  { path: 'caisse', canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN', 'CAISSIER', 'SUPER_ADMIN'] }, loadChildren: () => import('../pages/caisse-page/caisse-page.module').then((m) => m.CaissePageModule) },
  { path: 'paiements', canActivate: [AuthGuard, RoleGuard], data: { roles: ADMIN_ROLES }, loadChildren: () => import('../pages/paiement-page/paiement-page.module').then((m) => m.PaiementPageModule) },
  { path: 'annonces', canActivate: [AuthGuard, RoleGuard], data: { roles: ADMIN_ROLES }, loadChildren: () => import('../pages/annonce-page/annonce-page.module').then((m) => m.AnnoncePageModule) },
  { path: 'parametres', canActivate: [AuthGuard, RoleGuard], data: { roles: ADMIN_ROLES }, loadChildren: () => import('../pages/parametres-page/parametres-page.module').then((m) => m.ParametresPageModule) },
  { path: 'profil', canActivate: [AuthGuard], loadChildren: () => import('../pages/profil-page/profil-page.module').then((m) => m.ProfilPageModule) },
  { path: 'matieres', redirectTo: 'parametres', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
