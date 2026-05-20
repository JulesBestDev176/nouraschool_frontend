import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SchoolEffects } from './school.effects';
import { schoolReducer } from './school.reducer';
import { schoolFeatureKey } from './school.state';

@NgModule({
  imports: [
    StoreModule.forFeature(schoolFeatureKey, schoolReducer),
    EffectsModule.forFeature([SchoolEffects]),
  ],
})
export class SchoolStoreModule {}
