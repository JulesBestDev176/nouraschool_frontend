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

const routes: Routes = [


   // Pages publiques
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},

  // Routes protégées - Dashboards
    {path: 'dashboard/admin', component: DashboardAdminComponent},
    {path: 'dashboard/enseignant', component: DashboardEnseignantComponent},
    {path: 'dashboard/eleve', component: DashboardEleveComponent},
    {path: 'dashboard/parent', component: DashboardParentComponent},


  // Routes administrateur
    {path: 'admin/eleves', component: EleveComponent},
    {path: 'admin/personnel', component: PersonnelComponent},
    {path: 'admin/classes', component: ClasseComponent},
    {path: 'admin/parents', component: ParentComponent},
    {path: 'admin/matieres', component: MatiereComponent},
    {path: 'admin/caisse', component: CaisseComponent},
    


  // Routes enseignant
  // Routes communes (selon les rôles)
    {path: 'admin/bulletins', component: BulletinComponent},
    {path: 'admin/profil', component: ProfilComponent},
    {path: 'notes', component: NoteComponent},
    {path: 'paiements', component: PaiementComponent},
    {path: 'layout', component: LayoutComponent},


//Routes eleves
  {path: 'reclamations', component: ReclamationComponent},


  // Redirections par défaut selon le rôle
  // Route 404
  // { 
  //   path: '**', 
  //   redirectTo: '' 
  // }

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
