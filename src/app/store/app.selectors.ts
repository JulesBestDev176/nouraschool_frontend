import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoreState } from './app.state';

export const selectCoreState = createFeatureSelector<CoreState>('core');

export const selectAppInitialized = createSelector(
  selectCoreState,
  (state) => state.initialized,
);
