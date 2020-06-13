import { Action, createReducer, on } from '@ngrx/store';

import { User } from '../models';
import { UserActions } from '../actions';

export interface State {
    user: User | null;
}

export const initialState: State = {
    user: null
};

export const userReducer = createReducer(
    initialState,
    on(UserActions.fetchSuccess, (state, { user }) => ({ ...state, user }))
);

export function reducer(state: State | undefined, action: Action) {
    return userReducer(state, action);
}

export const getUser = (state: State) => state.user;
