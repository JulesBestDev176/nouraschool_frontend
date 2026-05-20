import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../../components/layout/layout.component';
import { NoteComponent } from '../../components/note/note.component';
import { PaiementComponent } from '../../components/paiement/paiement.component';
import { ReclamationComponent } from '../../components/reclamation/reclamation.component';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  { path: 'notes', component: NoteComponent, canActivate: [AuthGuard] },
  { path: 'paiements', component: PaiementComponent, canActivate: [AuthGuard] },
  { path: 'reclamations', component: ReclamationComponent, canActivate: [AuthGuard] },
  { path: 'layout', component: LayoutComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkspaceRoutingModule {}
