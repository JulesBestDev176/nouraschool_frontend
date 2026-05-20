import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmploiDuTempsComponent } from '../../../components/emploi-du-temps/emploi-du-temps.component';
import { LayoutComponentModule } from '../../../components/layout/layout-component.module';
import { PageSharedModule } from '../../../shared/page-shared.module';

@NgModule({
  declarations: [EmploiDuTempsComponent],
  imports: [PageSharedModule, LayoutComponentModule, RouterModule.forChild([{ path: '', component: EmploiDuTempsComponent }])],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EmploiDuTempsPageModule {}
