import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BulletinComponent } from '../../../components/bulletin/bulletin.component';
import { LayoutComponentModule } from '../../../components/layout/layout-component.module';
import { PageSharedModule } from '../../../shared/page-shared.module';

@NgModule({
  declarations: [BulletinComponent],
  imports: [PageSharedModule, LayoutComponentModule, RouterModule.forChild([{ path: '', component: BulletinComponent }])],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BulletinPageModule {}
