import { NgModule } from '@angular/core';
import { PageSharedModule } from '../shared/page-shared.module';

@NgModule({
  imports: [PageSharedModule],
  exports: [PageSharedModule],
})
export class ComponentsModule {}
