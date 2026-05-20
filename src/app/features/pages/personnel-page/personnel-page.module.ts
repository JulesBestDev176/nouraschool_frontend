import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PersonnelComponent } from '../../../components/personnel/personnel.component';
import { LayoutComponentModule } from '../../../components/layout/layout-component.module';
import { PageSharedModule } from '../../../shared/page-shared.module';

@NgModule({
  declarations: [PersonnelComponent],
  imports: [PageSharedModule, LayoutComponentModule, RouterModule.forChild([{ path: '', component: PersonnelComponent }])],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PersonnelPageModule {}
