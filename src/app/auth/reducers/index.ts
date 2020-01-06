import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '@pko/core/reducers';
import * as fromUser from './user';

export interface AuthState {
    state: fromUser.State;
}

export interface State extends fromRoot.State {
    auth: AuthState;
}

export const reducers: ActionReducerMap<AuthState> = {
    state: fromUser.reducer
};

export const getAuthState = createFeatureSelector<State, AuthState>('auth');

export const getUserState = createSelector(getAuthState, state => state.state);
export const getIsUserLoggedIn = createSelector(getUserState, fromUser.getIsLoggedIn);
export const getUser = createSelector(getUserState, fromUser.getUser);
