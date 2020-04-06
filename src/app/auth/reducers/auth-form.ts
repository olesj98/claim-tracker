import { Action, createReducer, on } from '@ngrx/store';

import { HttpError } from '@pko/core';

import { AuthFormActions, LoginActions } from '../actions';

export interface State {
    error: HttpError;
    pending: boolean;
}

export const initialState: State = {
    error: null,
    pending: false
};

export const authFormReducer = createReducer(
    initialState,
    on(LoginActions.login, state => ({ ...state, pending: true })),
    on(LoginActions.loginSuccess, AuthFormActions.flush, state => ({ ...state, pending: false, error: null })),
    on(LoginActions.loginFailed, (state, { error }) => ({ ...state, pending: false, error }))
);

export function reducer(state: State, action: Action) {
    return authFormReducer(state, action);
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
