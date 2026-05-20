import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CaisseComponent } from '../../../components/caisse/caisse.component';
import { LayoutComponentModule } from '../../../components/layout/layout-component.module';
import { PageSharedModule } from '../../../shared/page-shared.module';

@NgModule({
  declarations: [CaisseComponent],
  imports: [PageSharedModule, LayoutComponentModule, RouterModule.forChild([{ path: '', component: CaisseComponent }])],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CaissePageModule {}
