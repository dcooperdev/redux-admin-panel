import * as UIActions from './ui.actions';

export interface UiState {
  isLoading: boolean;
}

const initState: UiState = {
  isLoading: false
};

export const uiReducer = ( state = initState, action: UIActions.actions ): UiState => {

  switch ( action.type ) {

    case UIActions.APP_LOADING:
      return {
        isLoading: true
      };

    case UIActions.APP_READY:
      return {
        isLoading: false
      };

    default:
      return state;
  }
};
