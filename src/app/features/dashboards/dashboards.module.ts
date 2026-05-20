import { NgModule } from '@angular/core';
import { ComponentsModule } from '../../components/components.module';
import { DashboardsRoutingModule } from './dashboards-routing.module';

@NgModule({
  imports: [ComponentsModule, DashboardsRoutingModule],
})
export class DashboardsModule {}
