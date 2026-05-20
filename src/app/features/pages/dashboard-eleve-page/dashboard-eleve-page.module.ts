import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardEleveComponent } from '../../../components/dashboard-eleve/dashboard-eleve.component';
import { PageSharedModule } from '../../../shared/page-shared.module';

@NgModule({
  declarations: [DashboardEleveComponent],
  imports: [PageSharedModule, RouterModule.forChild([{ path: '', component: DashboardEleveComponent }])],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardElevePageModule {}
