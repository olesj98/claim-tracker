import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../core/reducers';
import * as fromUser from './user';

export interface AuthState {
  user: fromUser.State;
}

export interface State extends fromRoot.State {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AuthState> = {
  user: fromUser.reducer,
};

export const getAuthState = createFeatureSelector<State, AuthState>('auth');

export const getUserState = createSelector(getAuthState, state => state.user);
export const getIsUserLoggedIn = createSelector(getUserState, fromUser.getIsLoggedIn);
export const getUser = createSelector(getUserState, fromUser.getUser);
