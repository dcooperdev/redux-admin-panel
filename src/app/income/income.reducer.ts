import * as IncomeActions from './income.actions';
import { Income } from './model/income.model';
import { AppState } from '../app.reducer';

export interface IncomeState {
    items: Income[];
}

export interface AppState extends AppState {
  income: IncomeState;
}

const InitState: IncomeState = {
    items: []
};

export function incomeReducer( state = InitState, action: IncomeActions.actions ): IncomeState {

  switch ( action.type ) {

    case IncomeActions.SET_ITEMS:
      return {
        items: [
          ...action.items.map( item => {
            return {
              ...item
            };
          })
        ]
      };

    case IncomeActions.UNSET_ITEMS:
      return {
        items: []
      };



    default:
      return state;
  }

}
