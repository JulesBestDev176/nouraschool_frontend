import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaiementPublicComponent } from '../../../components/paiement-public/paiement-public.component';
import { PageSharedModule } from '../../../shared/page-shared.module';

@NgModule({
  declarations: [PaiementPublicComponent],
  imports: [PageSharedModule, RouterModule.forChild([{ path: '', component: PaiementPublicComponent }])],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PaiementPublicPageModule {}
