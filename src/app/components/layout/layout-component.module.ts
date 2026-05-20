import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { PageSharedModule } from '../../shared/page-shared.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [PageSharedModule],
  exports: [LayoutComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LayoutComponentModule {}
