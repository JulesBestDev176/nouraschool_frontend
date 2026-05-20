import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfilComponent } from '../../../components/profil/profil.component';
import { LayoutComponentModule } from '../../../components/layout/layout-component.module';
import { PageSharedModule } from '../../../shared/page-shared.module';

@NgModule({
  declarations: [ProfilComponent],
  imports: [PageSharedModule, LayoutComponentModule, RouterModule.forChild([{ path: '', component: ProfilComponent }])],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProfilPageModule {}
