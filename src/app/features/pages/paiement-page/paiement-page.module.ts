import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaiementComponent } from '../../../components/paiement/paiement.component';
import { LayoutComponentModule } from '../../../components/layout/layout-component.module';
import { PageSharedModule } from '../../../shared/page-shared.module';

@NgModule({
  declarations: [PaiementComponent],
  imports: [PageSharedModule, LayoutComponentModule, RouterModule.forChild([{ path: '', component: PaiementComponent }])],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PaiementPageModule {}
