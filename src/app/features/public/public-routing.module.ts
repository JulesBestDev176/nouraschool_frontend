import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../../components/home/home.component';
import { LoginComponent } from '../../components/login/login.component';
import { BulletinPublicComponent } from '../../components/bulletin-public/bulletin-public.component';
import { PaiementPublicComponent } from '../../components/paiement-public/paiement-public.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'bulletin/:token', component: BulletinPublicComponent },
  { path: 'paiement/:token', component: PaiementPublicComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
