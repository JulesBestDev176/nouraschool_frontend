import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { SkeletonModule } from 'primeng/skeleton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ChipModule } from 'primeng/chip';
import { AvatarModule } from 'primeng/avatar';
import { ProgressBarModule } from 'primeng/progressbar';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MultiSelectModule } from 'primeng/multiselect';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MenuModule } from 'primeng/menu';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ConfirmationService, MessageService } from 'primeng/api';

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
import { LoginComponent } from './components/login/login.component';
import { MatiereComponent } from './components/matiere/matiere.component';
import { SurveillantComponent } from './components/surveillant/surveillant.component';
import { AssistantComponent } from './components/assistant/assistant.component';
import { DashboardAssistantComponent } from './components/dashboard-assistant/dashboard-assistant.component';
import { DashboardSurveillantComponent } from './components/dashboard-surveillant/dashboard-surveillant.component';
import { NoteComponent } from './components/note/note.component';
import { AbsenceEleveComponent } from './components/absence-eleve/absence-eleve.component';
import { AbsencePersonnelComponent } from './components/absence-personnel/absence-personnel.component';
import { ConvocationComponent } from './components/convocation/convocation.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { AnnonceComponent } from './components/annonce/annonce.component';
import { EmploiDuTempsComponent } from './components/emploi-du-temps/emploi-du-temps.component';
import { PointageComponent } from './components/pointage/pointage.component';
import { BulletinPublicComponent } from './components/bulletin-public/bulletin-public.component';
import { PaiementPublicComponent } from './components/paiement-public/paiement-public.component';
import { EnseignantComponent } from './components/enseignant/enseignant.component';
import { CoursComponent } from './components/cours/cours.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import {
  AlertCircle, ArrowLeft, Ban, BookOpen, Building2, CalendarDays, ChartColumn,
  CircleUserRound, ClipboardList, Clock3, CreditCard, FileText, Globe,
  GraduationCap, Heart, LayoutDashboard, Lightbulb, Lock, LogOut, LucideAngularModule,
  Mail, Megaphone, MessageSquareWarning, NotebookPen, Plus, School, Settings,
  TriangleAlert, Users, UsersRound, Wallet
} from 'lucide-angular';

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
    CoursComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    // PrimeNG
    ButtonModule,
    CardModule,
    InputTextModule,
    InputTextareaModule,
    PasswordModule,
    DividerModule,
    TooltipModule,
    BadgeModule,
    RippleModule,
    TableModule,
    DialogModule,
    DropdownModule,
    TagModule,
    ToastModule,
    SkeletonModule,
    ConfirmDialogModule,
    ToolbarModule,
    InputNumberModule,
    CalendarModule,
    SelectButtonModule,
    ChipModule,
    AvatarModule,
    ProgressBarModule,
    PanelModule,
    TabViewModule,
    AutoCompleteModule,
    MultiSelectModule,
    MessageModule,
    MessagesModule,
    OverlayPanelModule,
    MenuModule,
    BreadcrumbModule,
    LucideAngularModule.pick({
      AlertCircle, ArrowLeft, Ban, BookOpen, Building2, CalendarDays, ChartColumn,
      CircleUserRound, ClipboardList, Clock3, CreditCard, FileText, Globe,
      GraduationCap, Heart, LayoutDashboard, Lightbulb, Lock, LogOut,
      Mail, Megaphone, MessageSquareWarning, NotebookPen, Plus, School, Settings,
      TriangleAlert, Users, UsersRound, Wallet
    })
  ],
  providers: [
    provideAnimationsAsync(),
    MessageService,
    ConfirmationService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
