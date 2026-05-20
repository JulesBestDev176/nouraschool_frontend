import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AnnonceComponent } from '../../../components/annonce/annonce.component';
import { LayoutComponentModule } from '../../../components/layout/layout-component.module';
import { PageSharedModule } from '../../../shared/page-shared.module';

@NgModule({
  declarations: [AnnonceComponent],
  imports: [PageSharedModule, LayoutComponentModule, RouterModule.forChild([{ path: '', component: AnnonceComponent }])],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AnnoncePageModule {}
