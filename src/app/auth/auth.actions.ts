import { Action } from '@ngrx/store';
import { User } from './model/user.model';

export const SET_USER = '[AUTH] Set user';
export const UNSET_USER = '[AUTH] Delet user';

export class SetUserAction implements Action {
  readonly type = SET_USER;

  constructor( public user: User ) { }
}

export class UnsetUserAction implements Action {
  readonly type = UNSET_USER;
}

export type actions = SetUserAction | UnsetUserAction;
