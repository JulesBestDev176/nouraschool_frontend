import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardParentComponent } from '../../../components/dashboard-parent/dashboard-parent.component';
import { PageSharedModule } from '../../../shared/page-shared.module';

@NgModule({
  declarations: [DashboardParentComponent],
  imports: [PageSharedModule, RouterModule.forChild([{ path: '', component: DashboardParentComponent }])],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardParentPageModule {}
