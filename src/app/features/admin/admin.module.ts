import { NgModule } from '@angular/core';
import { ComponentsModule } from '../../components/components.module';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [ComponentsModule, AdminRoutingModule],
})
export class AdminFeatureModule {}
