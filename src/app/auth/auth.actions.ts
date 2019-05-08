import { Action } from '@ngrx/store';
import { User } from './model/user.model';

export const SET_USER = '[AUTH] Set user';
export const DELEET_USER = '[AUTH] Delet user';

export class SetUserAction implements Action {
  readonly type = SET_USER;

  constructor( public user: User ) { }
}

export class DeletUserAction implements Action {
  readonly type = DELEET_USER;

  constructor( public uid: string ) { }
}

export type actions = SetUserAction | DeletUserAction;
