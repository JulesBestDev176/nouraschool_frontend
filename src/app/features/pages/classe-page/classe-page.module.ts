import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClasseComponent } from '../../../components/classe/classe.component';
import { LayoutComponentModule } from '../../../components/layout/layout-component.module';
import { PageSharedModule } from '../../../shared/page-shared.module';

@NgModule({
  declarations: [ClasseComponent],
  imports: [PageSharedModule, LayoutComponentModule, RouterModule.forChild([{ path: '', component: ClasseComponent }])],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ClassePageModule {}
