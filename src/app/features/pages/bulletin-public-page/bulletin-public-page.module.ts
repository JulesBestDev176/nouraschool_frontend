import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BulletinPublicComponent } from '../../../components/bulletin-public/bulletin-public.component';
import { PageSharedModule } from '../../../shared/page-shared.module';

@NgModule({
  declarations: [BulletinPublicComponent],
  imports: [PageSharedModule, RouterModule.forChild([{ path: '', component: BulletinPublicComponent }])],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BulletinPublicPageModule {}
