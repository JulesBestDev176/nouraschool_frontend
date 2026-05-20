import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConvocationComponent } from '../../../components/convocation/convocation.component';
import { LayoutComponentModule } from '../../../components/layout/layout-component.module';
import { PageSharedModule } from '../../../shared/page-shared.module';

@NgModule({
  declarations: [ConvocationComponent],
  imports: [PageSharedModule, LayoutComponentModule, RouterModule.forChild([{ path: '', component: ConvocationComponent }])],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ConvocationPageModule {}
