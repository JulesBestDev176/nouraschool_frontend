import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EleveComponent } from './components/eleve/eleve.component';
import { HomeComponent } from './components/home/home.component';
import { PersonnelComponent } from './components/personnel/personnel.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { DashboardEleveComponent } from './components/dashboard-eleve/dashboard-eleve.component';
import { DashboardEnseignantComponent } from './components/dashboard-enseignant/dashboard-enseignant.component';
import { DashboardParentComponent } from './components/dashboard-parent/dashboard-parent.component';
import { ClasseComponent } from './components/classe/classe.component';
import { ParentComponent } from './components/parent/parent.component';
import { NoteComponent } from './components/note/note.component';
import { BulletinComponent } from './components/bulletin/bulletin.component';
import { MatiereComponent } from './components/matiere/matiere.component';
import { CaisseComponent } from './components/caisse/caisse.component';
import { PaiementComponent } from './components/paiement/paiement.component';
import { LoginComponent } from './components/login/login.component';
import { ReclamationComponent } from './components/reclamation/reclamation.component';
import { ProfilComponent } from './components/profil/profil.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { BulletinPublicComponent } from './components/bulletin-public/bulletin-public.component';
import { PaiementPublicComponent } from './components/paiement-public/paiement-public.component';
import { AnnonceComponent } from './components/annonce/annonce.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { EmploiDuTempsComponent } from './components/emploi-du-temps/emploi-du-temps.component';
import { AbsenceEleveComponent } from './components/absence-eleve/absence-eleve.component';
import { AbsencePersonnelComponent } from './components/absence-personnel/absence-personnel.component';
import { ConvocationComponent } from './components/convocation/convocation.component';
import { PointageComponent } from './components/pointage/pointage.component';
import { SurveillantComponent } from './components/surveillant/surveillant.component';
import { AdminComponent } from './components/admin/admin.component';
import { EnseignantComponent } from './components/enseignant/enseignant.component';
import { CoursComponent } from './components/cours/cours.component';

const ADMIN_ROLES = ['ADMIN', 'SUPER_ADMIN'];

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'bulletin/:token', component: BulletinPublicComponent },
  { path: 'paiement/:token', component: PaiementPublicComponent },

  // Dashboards
  { path: 'dashboard/admin', component: DashboardAdminComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ADMIN_ROLES } },
  { path: 'dashboard/enseignant', component: DashboardEnseignantComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['ENSEIGNANT'] } },
  { path: 'dashboard/eleve', component: DashboardEleveComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['ELEVE'] } },
  { path: 'dashboard/parent', component: DashboardParentComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['PARENT'] } },
  { path: 'dashboard/caisse', component: CaisseComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['CAISSIER', ...ADMIN_ROLES] } },
  { path: 'dashboard/surveillant', component: SurveillantComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['SURVEILLANT', ...ADMIN_ROLES] } },

  // ─── Admin : Vie scolaire ─────────────────────────────────────────────────
  { path: 'admin/eleves', component: EleveComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ADMIN_ROLES } },
  { path: 'admin/classes', component: ClasseComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ADMIN_ROLES } },
  { path: 'admin/inscriptions', component: InscriptionComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ADMIN_ROLES } },
  { path: 'admin/parents', component: ParentComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ADMIN_ROLES } },

  // ─── Admin : Personnel & RH ───────────────────────────────────────────────
  { path: 'admin/enseignants', component: EnseignantComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ADMIN_ROLES } },
  { path: 'admin/personnel', component: PersonnelComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN', 'RH', 'SUPER_ADMIN'] } },
  { path: 'admin/pointages', component: PointageComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN', 'RH', 'SUPER_ADMIN'] } },
  { path: 'admin/absences-personnel', component: AbsencePersonnelComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN', 'RH', 'SUPER_ADMIN'] } },

  // ─── Admin : Pédagogie ────────────────────────────────────────────────────
  { path: 'admin/cours', component: CoursComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ADMIN_ROLES } },
  { path: 'admin/emplois-du-temps', component: EmploiDuTempsComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN', 'ENSEIGNANT', 'SUPER_ADMIN'] } },
  { path: 'admin/notes', component: NoteComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ADMIN_ROLES } },
  { path: 'admin/bulletins', component: BulletinComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN', 'ENSEIGNANT', 'SUPER_ADMIN'] } },

  // ─── Admin : Discipline ───────────────────────────────────────────────────
  { path: 'surveillant/absences', component: AbsenceEleveComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['SURVEILLANT', ...ADMIN_ROLES] } },
  { path: 'surveillant/convocations', component: ConvocationComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['SURVEILLANT', ...ADMIN_ROLES] } },
  { path: 'admin/reclamations', component: ReclamationComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ADMIN_ROLES } },

  // ─── Admin : Finance ──────────────────────────────────────────────────────
  { path: 'admin/caisse', component: CaisseComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN', 'CAISSIER', 'SUPER_ADMIN'] } },
  { path: 'admin/paiements', component: PaiementComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ADMIN_ROLES } },

  // ─── Admin : Communication ────────────────────────────────────────────────
  { path: 'admin/annonces', component: AnnonceComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ADMIN_ROLES } },

  // ─── Admin : Paramètres (Années, Cycles, Niveaux, Matières, Bâtiments, Salles) ─
  { path: 'admin/parametres', component: AdminComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ADMIN_ROLES } },

  // Profil (tous)
  { path: 'admin/profil', component: ProfilComponent, canActivate: [AuthGuard] },

  // Ancienne route matières — redirect vers paramètres
  { path: 'admin/matieres', redirectTo: 'admin/parametres', pathMatch: 'full' },

  // Routes communes
  { path: 'notes', component: NoteComponent, canActivate: [AuthGuard] },
  { path: 'paiements', component: PaiementComponent, canActivate: [AuthGuard] },
  { path: 'reclamations', component: ReclamationComponent, canActivate: [AuthGuard] },
  { path: 'layout', component: LayoutComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
