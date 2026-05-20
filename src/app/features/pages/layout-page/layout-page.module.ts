import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from '../../../components/layout/layout.component';
import { LayoutComponentModule } from '../../../components/layout/layout-component.module';

@NgModule({
  imports: [
    LayoutComponentModule,
    RouterModule.forChild([{ path: '', component: LayoutComponent }]),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LayoutPageModule {}
