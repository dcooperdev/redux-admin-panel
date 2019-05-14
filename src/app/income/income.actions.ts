import { Action } from '@ngrx/store';
import { Income } from './model/income.model';


export const SET_ITEMS = '[Income] Set items';
export const UNSET_ITEMS = '[Income] Unset items';

export class SetItemAction implements Action {
  readonly type = SET_ITEMS;

  constructor( public items: Income ) {}
}

export class UnsetItemAction implements Action {
  readonly type = UNSET_ITEMS;
}

export type actions = SetItemAction | UnsetItemAction;
