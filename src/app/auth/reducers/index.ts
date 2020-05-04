import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { fromRoot } from '@pko/core';

import * as fromUser from './user';
import * as fromAuthForm from './auth-form';
import * as fromRegistrationPath from './registration-path';

export interface AuthState {
    user: fromUser.State;
    authForm: fromAuthForm.State;
    registrationPath: fromRegistrationPath.State;
}

export interface State extends fromRoot.State {
    auth: AuthState;
}

export const reducers: ActionReducerMap<AuthState> = {
    user: fromUser.reducer,
    authForm: fromAuthForm.reducer,
    registrationPath: fromRegistrationPath.reducer
};

export const getAuthState = createFeatureSelector<State, AuthState>('auth');

export const getUserState = createSelector(getAuthState, state => state.user);
export const getUser = createSelector(getUserState, fromUser.getUser);

export const getAuthFormState = createSelector(getAuthState, state => state.authForm);
export const getAuthFormError = createSelector(getAuthFormState, fromAuthForm.getError);

export const getRegistrationPathState = createSelector(getAuthState, state => state.registrationPath);
export const getRegistrationVerificationError = createSelector(getRegistrationPathState, fromRegistrationPath.getVerificationError);
export const getRegistrationSmsError = createSelector(getRegistrationPathState, fromRegistrationPath.getSmsError);
export const getRegistrationSmsResend = createSelector(getRegistrationPathState, fromRegistrationPath.getSmsResend);
