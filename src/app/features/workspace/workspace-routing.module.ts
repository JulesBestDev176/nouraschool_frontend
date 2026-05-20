import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  {
    path: 'notes',
    canActivate: [AuthGuard],
    loadChildren: () => import('../pages/note-page/note-page.module').then((m) => m.NotePageModule),
  },
  {
    path: 'paiements',
    canActivate: [AuthGuard],
    loadChildren: () => import('../pages/paiement-page/paiement-page.module').then((m) => m.PaiementPageModule),
  },
  {
    path: 'reclamations',
    canActivate: [AuthGuard],
    loadChildren: () => import('../pages/reclamation-page/reclamation-page.module').then((m) => m.ReclamationPageModule),
  },
  {
    path: 'layout',
    canActivate: [AuthGuard],
    loadChildren: () => import('../pages/layout-page/layout-page.module').then((m) => m.LayoutPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkspaceRoutingModule {}
