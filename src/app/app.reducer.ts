import { ActionReducerMap } from '@ngrx/store';
import * as UIActions from './shared/ui.reducer';
import * as AuthActions from './auth/auth.reducer';
// import * as Income from './income/income.reducer';

export interface AppState {
  ui: UIActions.UiState;
  auth: AuthActions.AuthState;
  // income: Income.IncomeState;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: UIActions.uiReducer,
  auth: AuthActions.authReducer,
  // income: Income.incomeReducer
};
