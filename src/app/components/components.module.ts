import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MaterialModule } from '../material.module';
import { EleveComponent } from './eleve/eleve.component';
import { ParentComponent } from './parent/parent.component';
import { PersonnelComponent } from './personnel/personnel.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { BulletinComponent } from './bulletin/bulletin.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardEnseignantComponent } from './dashboard-enseignant/dashboard-enseignant.component';
import { DashboardEleveComponent } from './dashboard-eleve/dashboard-eleve.component';
import { DashboardParentComponent } from './dashboard-parent/dashboard-parent.component';
import { CaisseComponent } from './caisse/caisse.component';
import { ClasseComponent } from './classe/classe.component';
import { ProfilComponent } from './profil/profil.component';
import { PaiementComponent } from './paiement/paiement.component';
import { LayoutComponent } from './layout/layout.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { LoginComponent } from './login/login.component';
import { MatiereComponent } from './matiere/matiere.component';
import { SurveillantComponent } from './surveillant/surveillant.component';
import { AssistantComponent } from './assistant/assistant.component';
import { DashboardAssistantComponent } from './dashboard-assistant/dashboard-assistant.component';
import { DashboardSurveillantComponent } from './dashboard-surveillant/dashboard-surveillant.component';
import { NoteComponent } from './note/note.component';
import { AbsenceEleveComponent } from './absence-eleve/absence-eleve.component';
import { AbsencePersonnelComponent } from './absence-personnel/absence-personnel.component';
import { ConvocationComponent } from './convocation/convocation.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { AnnonceComponent } from './annonce/annonce.component';
import { EmploiDuTempsComponent } from './emploi-du-temps/emploi-du-temps.component';
import { PointageComponent } from './pointage/pointage.component';
import { BulletinPublicComponent } from './bulletin-public/bulletin-public.component';
import { PaiementPublicComponent } from './paiement-public/paiement-public.component';
import { EnseignantComponent } from './enseignant/enseignant.component';
import { CoursComponent } from './cours/cours.component';

const COMPONENTS = [
  EleveComponent,
  ParentComponent,
  PersonnelComponent,
  AdminComponent,
  HomeComponent,
  BulletinComponent,
  DashboardAdminComponent,
  DashboardEnseignantComponent,
  DashboardEleveComponent,
  DashboardParentComponent,
  CaisseComponent,
  ClasseComponent,
  ProfilComponent,
  PaiementComponent,
  LayoutComponent,
  ReclamationComponent,
  LoginComponent,
  MatiereComponent,
  SurveillantComponent,
  AssistantComponent,
  DashboardAssistantComponent,
  DashboardSurveillantComponent,
  NoteComponent,
  AbsenceEleveComponent,
  AbsencePersonnelComponent,
  ConvocationComponent,
  InscriptionComponent,
  AnnonceComponent,
  EmploiDuTempsComponent,
  PointageComponent,
  BulletinPublicComponent,
  PaiementPublicComponent,
  EnseignantComponent,
  CoursComponent,
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    NgScrollbarModule,
    TranslateModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    NgScrollbarModule,
    TranslateModule,
    ...COMPONENTS,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {}
