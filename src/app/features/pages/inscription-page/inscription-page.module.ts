import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InscriptionComponent } from '../../../components/inscription/inscription.component';
import { LayoutComponentModule } from '../../../components/layout/layout-component.module';
import { PageSharedModule } from '../../../shared/page-shared.module';

@NgModule({
  declarations: [InscriptionComponent],
  imports: [PageSharedModule, LayoutComponentModule, RouterModule.forChild([{ path: '', component: InscriptionComponent }])],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InscriptionPageModule {}
