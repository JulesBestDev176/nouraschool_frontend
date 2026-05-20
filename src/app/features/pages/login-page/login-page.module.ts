import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../../../components/login/login.component';
import { PageSharedModule } from '../../../shared/page-shared.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [PageSharedModule, RouterModule.forChild([{ path: '', component: LoginComponent }])],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginPageModule {}
