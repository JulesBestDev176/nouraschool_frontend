import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SurveillantComponent } from '../../../components/surveillant/surveillant.component';
import { LayoutComponentModule } from '../../../components/layout/layout-component.module';
import { PageSharedModule } from '../../../shared/page-shared.module';

@NgModule({
  declarations: [SurveillantComponent],
  imports: [PageSharedModule, LayoutComponentModule, RouterModule.forChild([{ path: '', component: SurveillantComponent }])],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SurveillantPageModule {}
