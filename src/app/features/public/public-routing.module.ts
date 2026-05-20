import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicEntryGuard } from '../../guards/public-entry.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [PublicEntryGuard],
    loadChildren: () => import('../pages/home-page/home-page.module').then((m) => m.HomePageModule),
  },
  {
    path: 'home',
    canActivate: [PublicEntryGuard],
    loadChildren: () => import('../pages/home-page/home-page.module').then((m) => m.HomePageModule),
  },
  {
    path: 'login',
    canActivate: [PublicEntryGuard],
    loadChildren: () => import('../pages/login-page/login-page.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'bulletin/:token',
    loadChildren: () => import('../pages/bulletin-public-page/bulletin-public-page.module').then((m) => m.BulletinPublicPageModule),
  },
  {
    path: 'paiement/:token',
    loadChildren: () => import('../pages/paiement-public-page/paiement-public-page.module').then((m) => m.PaiementPublicPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
