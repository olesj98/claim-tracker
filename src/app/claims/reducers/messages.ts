import { Action, createReducer, on } from '@ngrx/store';

import { Message } from '../models';
import { ClaimDetailsActions, MessagesActions } from '../actions';

export interface State {
    messages: Array<Message>;
}

export const initialState: State = {
    messages: []
};

export const messagesReducer = createReducer(
    initialState,
    on(MessagesActions.fetchSuccess, (state, { messages }) =>
        ({ ...state, messages: [...messages] })),
    on(MessagesActions.sendSuccess, (state, { message }) =>
        ({ ...state, messages: [...state.messages, message] })),
    on(ClaimDetailsActions.flush, () => initialState)
);

export function reducer(state: State | undefined, action: Action) {
    return messagesReducer(state, action);
}

export const getAll = (state: State) => state.messages;
