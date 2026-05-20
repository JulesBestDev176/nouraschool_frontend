import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReclamationComponent } from '../../../components/reclamation/reclamation.component';
import { LayoutComponentModule } from '../../../components/layout/layout-component.module';
import { PageSharedModule } from '../../../shared/page-shared.module';

@NgModule({
  declarations: [ReclamationComponent],
  imports: [PageSharedModule, LayoutComponentModule, RouterModule.forChild([{ path: '', component: ReclamationComponent }])],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ReclamationPageModule {}
