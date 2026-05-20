import { createAction, props } from '@ngrx/store';
import { Classe } from '../../models/classe';
import { Eleve } from '../../models/eleve';
import { Parent } from '../../models/parent';

export const loadSchoolReferenceData = createAction('[School] Load reference data');
export const loadSchoolReferenceDataSuccess = createAction(
  '[School] Load reference data success',
  props<{ classes: Classe[]; parents: Parent[] }>(),
);
export const loadSchoolReferenceDataFailure = createAction(
  '[School] Load reference data failure',
  props<{ error: string }>(),
);

export const loadEleves = createAction('[School] Load eleves', props<{ page?: number; size?: number; classeId?: string }>());
export const loadElevesSuccess = createAction(
  '[School] Load eleves success',
  props<{ eleves: Eleve[]; totalElements: number; page: number; size: number }>(),
);
export const loadElevesFailure = createAction('[School] Load eleves failure', props<{ error: string }>());

export const createEleve = createAction('[School] Create eleve', props<{ eleve: Partial<Eleve> }>());
export const createEleveSuccess = createAction('[School] Create eleve success', props<{ eleve: Eleve }>());
export const createEleveFailure = createAction('[School] Create eleve failure', props<{ error: string }>());

export const updateEleve = createAction('[School] Update eleve', props<{ id: string; changes: Partial<Eleve> }>());
export const updateEleveSuccess = createAction('[School] Update eleve success', props<{ eleve: Eleve }>());
export const updateEleveFailure = createAction('[School] Update eleve failure', props<{ error: string }>());

export const clearSchoolError = createAction('[School] Clear error');
