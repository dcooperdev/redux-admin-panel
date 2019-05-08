import { Action } from '@ngrx/store';

export const APP_LOADING = '[UI Loading] Loading';
export const APP_READY = '[UI Ready] Ready';

export class ActivateLoadingAction implements Action {
  readonly type = APP_LOADING;
}

export class ActivateReadygAction implements Action {
  readonly type = APP_READY;
}

export type actions = ActivateLoadingAction | ActivateReadygAction;
