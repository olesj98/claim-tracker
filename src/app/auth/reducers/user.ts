import { Action, createReducer, on } from '@ngrx/store';

import { User } from '../models';
import { LoginActions, UserActions } from '../actions';

export interface State {
    user: User | null;
    isLoggedIn: boolean;
}

export const initialState: State = {
    user: null,
    isLoggedIn: false
};

export const userReducer = createReducer(
    initialState,
    on(LoginActions.loginSuccess, state => ({
        ...state,
        isLoggedIn: true
    })),
    on(LoginActions.loginFailed, state => ({
        ...state,
        user: null,
        isLoggedIn: false
    })),
    on(UserActions.fetchSuccess, (state, { user }) => ({ ...state, user }))
);

export function reducer(state: State | undefined, action: Action) {
    return userReducer(state, action);
}

export const getIsLoggedIn = (state: State) => state.isLoggedIn;
export const getUser = (state: State) => state.user;
