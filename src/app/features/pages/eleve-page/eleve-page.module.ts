import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EleveComponent } from '../../../components/eleve/eleve.component';
import { LayoutComponentModule } from '../../../components/layout/layout-component.module';
import { PageSharedModule } from '../../../shared/page-shared.module';

@NgModule({
  declarations: [EleveComponent],
  imports: [PageSharedModule, LayoutComponentModule, RouterModule.forChild([{ path: '', component: EleveComponent }])],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ElevePageModule {}
