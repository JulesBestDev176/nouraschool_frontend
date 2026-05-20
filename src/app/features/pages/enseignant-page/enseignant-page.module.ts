import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EnseignantComponent } from '../../../components/enseignant/enseignant.component';
import { LayoutComponentModule } from '../../../components/layout/layout-component.module';
import { PageSharedModule } from '../../../shared/page-shared.module';

@NgModule({
  declarations: [EnseignantComponent],
  imports: [PageSharedModule, LayoutComponentModule, RouterModule.forChild([{ path: '', component: EnseignantComponent }])],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EnseignantPageModule {}
