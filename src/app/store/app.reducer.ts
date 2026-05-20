import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { appInitialized } from './app.actions';
import { AppState, initialCoreState } from './app.state';

export const coreReducer = createReducer(
  initialCoreState,
  on(appInitialized, (state) => ({ ...state, initialized: true })),
);

export const reducers: ActionReducerMap<AppState> = {
  core: coreReducer,
  router: routerReducer,
};
