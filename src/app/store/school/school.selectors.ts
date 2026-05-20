import { createFeatureSelector, createSelector } from '@ngrx/store';
import { classesAdapter, elevesAdapter, parentsAdapter, schoolFeatureKey, SchoolState } from './school.state';

export const selectSchoolState = createFeatureSelector<SchoolState>(schoolFeatureKey);

const eleveSelectors = elevesAdapter.getSelectors();
const classeSelectors = classesAdapter.getSelectors();
const parentSelectors = parentsAdapter.getSelectors();

export const selectEleves = createSelector(selectSchoolState, (state) => eleveSelectors.selectAll(state.eleves));
export const selectClasses = createSelector(selectSchoolState, (state) => classeSelectors.selectAll(state.classes));
export const selectParents = createSelector(selectSchoolState, (state) => parentSelectors.selectAll(state.parents));
export const selectSchoolLoading = createSelector(selectSchoolState, (state) => state.loading);
export const selectSchoolSaving = createSelector(selectSchoolState, (state) => state.saving);
export const selectSchoolError = createSelector(selectSchoolState, (state) => state.error);
export const selectTotalEleves = createSelector(selectSchoolState, (state) => state.totalEleves);
