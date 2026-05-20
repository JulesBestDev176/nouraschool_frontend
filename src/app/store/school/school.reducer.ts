import { createReducer, on } from '@ngrx/store';
import * as SchoolActions from './school.actions';
import {
  classesAdapter,
  elevesAdapter,
  initialSchoolState,
  parentsAdapter,
} from './school.state';

export const schoolReducer = createReducer(
  initialSchoolState,
  on(
    SchoolActions.loadSchoolReferenceData,
    SchoolActions.loadEleves,
    (state) => ({ ...state, loading: true, error: null }),
  ),
  on(SchoolActions.createEleve, SchoolActions.updateEleve, (state) => ({
    ...state,
    saving: true,
    error: null,
  })),
  on(SchoolActions.loadSchoolReferenceDataSuccess, (state, { classes, parents }) => ({
    ...state,
    classes: classesAdapter.setAll(classes, state.classes),
    parents: parentsAdapter.setAll(parents, state.parents),
    loading: false,
    loaded: true,
  })),
  on(SchoolActions.loadElevesSuccess, (state, { eleves, totalElements, page, size }) => ({
    ...state,
    eleves: elevesAdapter.setAll(eleves, state.eleves),
    totalEleves: totalElements,
    page,
    size,
    loading: false,
    loaded: true,
  })),
  on(SchoolActions.createEleveSuccess, (state, { eleve }) => ({
    ...state,
    eleves: elevesAdapter.addOne(eleve, state.eleves),
    totalEleves: state.totalEleves + 1,
    saving: false,
  })),
  on(SchoolActions.updateEleveSuccess, (state, { eleve }) => ({
    ...state,
    eleves: elevesAdapter.upsertOne(eleve, state.eleves),
    saving: false,
  })),
  on(
    SchoolActions.loadSchoolReferenceDataFailure,
    SchoolActions.loadElevesFailure,
    (state, { error }) => ({ ...state, loading: false, error }),
  ),
  on(
    SchoolActions.createEleveFailure,
    SchoolActions.updateEleveFailure,
    (state, { error }) => ({ ...state, saving: false, error }),
  ),
  on(SchoolActions.clearSchoolError, (state) => ({ ...state, error: null })),
);
