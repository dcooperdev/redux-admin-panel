import { ActionReducerMap } from '@ngrx/store';
import * as UIActions from './shared/ui.reducer';
import * as AuthActions from './auth/auth.reducer';

export interface AppState {
  ui: UIActions.UiState;
  auth: AuthActions.AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: UIActions.uiReducer,
  auth: AuthActions.authReducer
};
