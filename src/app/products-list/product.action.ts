import { Action } from '@ngrx/store';
import { Product } from './model/product.model';

export const SET_PRODUCTITEM = '[Income] Set products items';
export const UNSET_PRODUCTITEM = '[Income] Unset products items';

export class SetProductAction implements Action {
  readonly type = SET_PRODUCTITEM;

  constructor( public items: Product ) {}
}

export class UnsetProductAction implements Action {
  readonly type = UNSET_PRODUCTITEM;
}

export type actions = SetProductAction | UnsetProductAction;
