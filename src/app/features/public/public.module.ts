import { NgModule } from '@angular/core';
import { ComponentsModule } from '../../components/components.module';
import { PublicRoutingModule } from './public-routing.module';

@NgModule({
  imports: [ComponentsModule, PublicRoutingModule],
})
export class PublicModule {}
