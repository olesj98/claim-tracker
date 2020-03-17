import { Action, createReducer, on } from '@ngrx/store';

import { User } from '../models';
import { LoginActions } from '../actions';

export interface State {
  user: User | null;
  isLoggedIn: boolean;
}

const savedUser = JSON.parse(localStorage.getItem('_user'));

export const initialState: State = {
  user: savedUser || null,
  isLoggedIn: !!savedUser
};

export const userReducer = createReducer(
  initialState,
  on(LoginActions.loginSuccess, (state, { user }) => ({
    ...state,
    isLoggedIn: true,
    user: { ...state.user, ...user }
  })),
  on(LoginActions.loginFailed, state => ({
    ...state,
    user: null,
    isLoggedIn: false
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return userReducer(state, action);
}

export const getIsLoggedIn = (state: State) => state.isLoggedIn;
export const getUser = (state: State) => state.user;
