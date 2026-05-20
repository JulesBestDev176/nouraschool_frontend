import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AbsencePersonnelComponent } from '../../../components/absence-personnel/absence-personnel.component';
import { LayoutComponentModule } from '../../../components/layout/layout-component.module';
import { PageSharedModule } from '../../../shared/page-shared.module';

@NgModule({
  declarations: [AbsencePersonnelComponent],
  imports: [PageSharedModule, LayoutComponentModule, RouterModule.forChild([{ path: '', component: AbsencePersonnelComponent }])],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AbsencePersonnelPageModule {}
