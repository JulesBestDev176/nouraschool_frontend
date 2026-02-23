import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EleveComponent } from './components/eleve/eleve.component';
import { ParentComponent } from './components/parent/parent.component';
import { PersonnelComponent } from './components/personnel/personnel.component';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { BulletinComponent } from './components/bulletin/bulletin.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { DashboardEnseignantComponent } from './components/dashboard-enseignant/dashboard-enseignant.component';
import { DashboardEleveComponent } from './components/dashboard-eleve/dashboard-eleve.component';
import { DashboardParentComponent } from './components/dashboard-parent/dashboard-parent.component';
import { CaisseComponent } from './components/caisse/caisse.component';
import { ClasseComponent } from './components/classe/classe.component';
import { ProfilComponent } from './components/profil/profil.component';
import { PaiementComponent } from './components/paiement/paiement.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ReclamationComponent } from './components/reclamation/reclamation.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './components/login/login.component';
import { MatiereComponent } from './components/matiere/matiere.component';
import { SurveillantComponent } from './components/surveillant/surveillant.component';
import { AssistantComponent } from './components/assistant/assistant.component';
import { DashboardAssistantComponent } from './components/dashboard-assistant/dashboard-assistant.component';
import { DashboardSurveillantComponent } from './components/dashboard-surveillant/dashboard-surveillant.component';

@NgModule({
  declarations: [
    AppComponent,
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
    DashboardSurveillantComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
