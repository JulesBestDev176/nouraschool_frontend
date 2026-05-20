import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AbsenceEleveComponent } from '../../../components/absence-eleve/absence-eleve.component';
import { LayoutComponentModule } from '../../../components/layout/layout-component.module';
import { PageSharedModule } from '../../../shared/page-shared.module';

@NgModule({
  declarations: [AbsenceEleveComponent],
  imports: [PageSharedModule, LayoutComponentModule, RouterModule.forChild([{ path: '', component: AbsenceEleveComponent }])],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AbsenceElevePageModule {}
