import { NgModule } from '@angular/core';
import { ComponentsModule } from '../../components/components.module';
import { WorkspaceRoutingModule } from './workspace-routing.module';

@NgModule({
  imports: [ComponentsModule, WorkspaceRoutingModule],
})
export class WorkspaceModule {}
