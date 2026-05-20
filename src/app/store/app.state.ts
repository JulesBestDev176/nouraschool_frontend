import { RouterReducerState } from '@ngrx/router-store';

export interface CoreState {
  initialized: boolean;
}

export interface AppState {
  core: CoreState;
  router: RouterReducerState;
}

export const initialCoreState: CoreState = {
  initialized: false,
};
