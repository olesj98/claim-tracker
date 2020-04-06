import { Action, createReducer, on } from '@ngrx/store';

import { HttpError } from '@pko/core';

import { RegistrationPathActions, SignupActions } from '../actions';

export interface State {
    verificationError: HttpError | null;
    smsError: HttpError | null;
}

export const initialState: State = {
    verificationError: null,
    smsError: null
};

export const registrationPathReducer = createReducer(
    initialState,
    on(SignupActions.verifyFailed, (state, { error }) => ({ ...state, verificationError: error })),
    on(SignupActions.verifySMSFailed, (state, { error }) => ({ ...state, smsError: error })),
    on(SignupActions.verifySuccess, state => ({ ...state, verificationError: null })),
    on(SignupActions.verifySMSSuccess, SignupActions.resendSMSSuccess, state => ({ ...state, smsError: null })),
    on(RegistrationPathActions.flush, state =>
        ({ ...state, verificationError: null, smsError: null }))
);

export function reducer(state: State, action: Action) {
    return registrationPathReducer(state, action);
}

export const getVerificationError = (state: State) => state.verificationError;
export const getSmsError = (state: State) => state.smsError;
