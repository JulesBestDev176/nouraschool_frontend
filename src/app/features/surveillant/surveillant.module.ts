import { NgModule } from '@angular/core';
import { ComponentsModule } from '../../components/components.module';
import { SurveillantRoutingModule } from './surveillant-routing.module';

@NgModule({
  imports: [ComponentsModule, SurveillantRoutingModule],
})
export class SurveillantFeatureModule {}
