import { Action, createReducer, on } from '@ngrx/store';

import { HttpError } from '@pko/core';

import { RegistrationPathActions, SignupActions } from '../actions';

export interface State {
    verificationError: HttpError | null;
    sms: {
        error: HttpError | null;
        resend: boolean;
    };
}

export const initialState: State = {
    verificationError: null,
    sms: {
        error: null,
        resend: false
    }
};

export const registrationPathReducer = createReducer(
    initialState,
    on(SignupActions.verifyFailed, (state, { error }) => ({ ...state, verificationError: error })),
    on(SignupActions.verifySMSFailed, (state, { error }) =>
        ({ ...state, sms: { ...state.sms, error } })),
    on(SignupActions.verifySuccess, state => ({ ...state, verificationError: null })),
    on(SignupActions.verifySMSSuccess, SignupActions.resendSMSSuccess, state =>
        ({ ...state, sms: { ...state.sms, error: null } })),
    on(SignupActions.resendSMSSuccess, state =>
        ({ ...state, sms: { ...state.sms, resend: false } })),
    on(SignupActions.allowResendSms, state =>
        ({ ...state, sms: { ...state.sms, resend: true } })),
    on(RegistrationPathActions.flush, state =>
        ({ ...state, verificationError: null, sms: { ...state.sms, error: null } }))
);

export function reducer(state: State, action: Action) {
    return registrationPathReducer(state, action);
}

export const getVerificationError = (state: State) => state.verificationError;
export const getSmsError = (state: State) => state.sms.error;
export const getSmsResend = (state: State) => state.sms.resend;
