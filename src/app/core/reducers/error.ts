import { Action, createReducer, on } from '@ngrx/store';

import { SignupActions } from '@pko/auth/actions';

import { ErrorInfo } from '@pko/core/error';

export interface State {
  errorInfo: ErrorInfo;
}

export const initialState: State = {
  errorInfo: null
};

export const errorReducer = createReducer(
  initialState,
  on(SignupActions.verifyFailed, (state, { err }) => ({
      ...state,
      errorInfo: err
    })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return errorReducer(state, action);
}

export const getError = (state: State) => state.errorInfo;
