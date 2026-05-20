import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboards/dashboards.module').then((m) => m.DashboardsModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.module').then((m) => m.AdminFeatureModule),
  },
  {
    path: 'surveillant',
    loadChildren: () => import('./features/surveillant/surveillant.module').then((m) => m.SurveillantFeatureModule),
  },
  {
    path: '',
    loadChildren: () => import('./features/public/public.module').then((m) => m.PublicModule),
  },
  {
    path: '',
    loadChildren: () => import('./features/workspace/workspace.module').then((m) => m.WorkspaceModule),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      bindToComponentInputs: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
