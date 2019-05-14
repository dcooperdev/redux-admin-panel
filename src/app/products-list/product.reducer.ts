import * as ProductActions from './product.action';
import { Product } from './model/product.model';

export interface ProductState {
  items: Product[];
}
/*
export interface AppState extends AppState {
  product: ProductState;
}
*/
const InitState: ProductState = {
  items: []
};

export function productReducer( state = InitState, action: ProductActions.actions ): ProductState {

  switch ( action.type ) {

    case ProductActions.SET_PRODUCTITEM:
    return {
      items: [
        ...action.items.map( item => {
          return {
            ...item
          };
        })
      ]
    };

    case ProductActions.UNSET_PRODUCTITEM:
    return {
      items: []
    };

    default:
      return state;
  }
}
