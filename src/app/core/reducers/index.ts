import { InjectionToken } from '@angular/core';
import { ActionReducerMap, createSelector } from '@ngrx/store';

import * as fromError from './error';

export interface State {
  error: fromError.State;
}

export const reducers: ActionReducerMap<State> = {
  error: fromError.errorReducer
};

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<State>>('reducers.root', {
  factory: () => reducers
});

export const getErrorState = (state: State) => state.error;
export const getError = createSelector(getErrorState, fromError.getError);
