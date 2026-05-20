import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Classe } from '../../models/classe';
import { Eleve } from '../../models/eleve';
import { Parent } from '../../models/parent';

export const schoolFeatureKey = 'school';

export interface SchoolState {
  eleves: EntityState<Eleve>;
  classes: EntityState<Classe>;
  parents: EntityState<Parent>;
  loading: boolean;
  saving: boolean;
  loaded: boolean;
  error: string | null;
  totalEleves: number;
  page: number;
  size: number;
}

export const elevesAdapter = createEntityAdapter<Eleve>();
export const classesAdapter = createEntityAdapter<Classe>();
export const parentsAdapter = createEntityAdapter<Parent>();

export const initialSchoolState: SchoolState = {
  eleves: elevesAdapter.getInitialState(),
  classes: classesAdapter.getInitialState(),
  parents: parentsAdapter.getInitialState(),
  loading: false,
  saving: false,
  loaded: false,
  error: null,
  totalEleves: 0,
  page: 0,
  size: 20,
};
