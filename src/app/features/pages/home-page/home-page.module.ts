import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../../../components/home/home.component';
import { PageSharedModule } from '../../../shared/page-shared.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [PageSharedModule, RouterModule.forChild([{ path: '', component: HomeComponent }])],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePageModule {}
