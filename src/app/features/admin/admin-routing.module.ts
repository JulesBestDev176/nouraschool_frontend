import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbsencePersonnelComponent } from '../../components/absence-personnel/absence-personnel.component';
import { AdminComponent } from '../../components/admin/admin.component';
import { AnnonceComponent } from '../../components/annonce/annonce.component';
import { BulletinComponent } from '../../components/bulletin/bulletin.component';
import { CaisseComponent } from '../../components/caisse/caisse.component';
import { ClasseComponent } from '../../components/classe/classe.component';
import { CoursComponent } from '../../components/cours/cours.component';
import { EleveComponent } from '../../components/eleve/eleve.component';
import { EmploiDuTempsComponent } from '../../components/emploi-du-temps/emploi-du-temps.component';
import { EnseignantComponent } from '../../components/enseignant/enseignant.component';
import { InscriptionComponent } from '../../components/inscription/inscription.component';
import { PaiementComponent } from '../../components/paiement/paiement.component';
import { ParentComponent } from '../../components/parent/parent.component';
import { PersonnelComponent } from '../../components/personnel/personnel.component';
import { PointageComponent } from '../../components/pointage/pointage.component';
import { ProfilComponent } from '../../components/profil/profil.component';
import { ReclamationComponent } from '../../components/reclamation/reclamation.component';
import { NoteComponent } from '../../components/note/note.component';
import { AuthGuard } from '../../guards/auth.guard';
import { RoleGuard } from '../../guards/role.guard';

const ADMIN_ROLES = ['ADMIN', 'SUPER_ADMIN'];
const RH_ROLES = ['ADMIN', 'RH', 'SUPER_ADMIN'];

const routes: Routes = [
  { path: 'eleves', component: EleveComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ADMIN_ROLES } },
  { path: 'classes', component: ClasseComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ADMIN_ROLES } },
  { path: 'inscriptions', component: InscriptionComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ADMIN_ROLES } },
  { path: 'parents', component: ParentComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ADMIN_ROLES } },
  { path: 'enseignants', component: EnseignantComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ADMIN_ROLES } },
  { path: 'personnel', component: PersonnelComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: RH_ROLES } },
  { path: 'pointages', component: PointageComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: RH_ROLES } },
  { path: 'absences-personnel', component: AbsencePersonnelComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: RH_ROLES } },
  { path: 'cours', component: CoursComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ADMIN_ROLES } },
  { path: 'emplois-du-temps', component: EmploiDuTempsComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN', 'ENSEIGNANT', 'SUPER_ADMIN'] } },
  { path: 'notes', component: NoteComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ADMIN_ROLES } },
  { path: 'bulletins', component: BulletinComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN', 'ENSEIGNANT', 'SUPER_ADMIN'] } },
  { path: 'reclamations', component: ReclamationComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ADMIN_ROLES } },
  { path: 'caisse', component: CaisseComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN', 'CAISSIER', 'SUPER_ADMIN'] } },
  { path: 'paiements', component: PaiementComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ADMIN_ROLES } },
  { path: 'annonces', component: AnnonceComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ADMIN_ROLES } },
  { path: 'parametres', component: AdminComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ADMIN_ROLES } },
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard] },
  { path: 'matieres', redirectTo: 'parametres', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
