import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardEnseignantComponent } from '../../../components/dashboard-enseignant/dashboard-enseignant.component';
import { PageSharedModule } from '../../../shared/page-shared.module';

@NgModule({
  declarations: [DashboardEnseignantComponent],
  imports: [PageSharedModule, RouterModule.forChild([{ path: '', component: DashboardEnseignantComponent }])],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardEnseignantPageModule {}
