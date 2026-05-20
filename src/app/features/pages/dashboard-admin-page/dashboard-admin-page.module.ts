import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardAdminComponent } from '../../../components/dashboard-admin/dashboard-admin.component';
import { LayoutComponentModule } from '../../../components/layout/layout-component.module';
import { PageSharedModule } from '../../../shared/page-shared.module';

@NgModule({
  declarations: [DashboardAdminComponent],
  imports: [PageSharedModule, LayoutComponentModule, RouterModule.forChild([{ path: '', component: DashboardAdminComponent }])],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardAdminPageModule {}
