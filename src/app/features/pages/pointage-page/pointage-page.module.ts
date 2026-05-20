import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PointageComponent } from '../../../components/pointage/pointage.component';
import { LayoutComponentModule } from '../../../components/layout/layout-component.module';
import { PageSharedModule } from '../../../shared/page-shared.module';

@NgModule({
  declarations: [PointageComponent],
  imports: [PageSharedModule, LayoutComponentModule, RouterModule.forChild([{ path: '', component: PointageComponent }])],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PointagePageModule {}
