import { Action, createReducer, on } from '@ngrx/store';

import { Message } from '../models';
import { ClaimDetailsActions, MessagesActions } from '../actions';

export interface State {
    messages: Array<Message>;
    unreadMessagesCount: number;
}

export const initialState: State = {
    messages: [],
    unreadMessagesCount: 0
};

export const messagesReducer = createReducer(
    initialState,
    on(MessagesActions.fetchSuccess, (state, { messages }) =>
        ({ ...state, messages: [...messages] })),
    on(MessagesActions.sendSuccess, (state, { message }) =>
        ({ ...state, messages: [...state.messages, message], unreadMessagesCount: 0 })),
    on(MessagesActions.getUnreadMessagesCountSuccess, (state, { count }) =>
        ({ ...state, unreadMessagesCount: count })),
    on(ClaimDetailsActions.flush, () => initialState)
);

export function reducer(state: State | undefined, action: Action) {
    return messagesReducer(state, action);
}

export const getAll = (state: State) => state.messages;
export const getUnreadMessagesCount = (state: State) => state.unreadMessagesCount;
export const getLatestByNotificationDate = (state: Array<Message>) => {
    return state
        .slice()
        .map(message => message.notificationDate)
        .sort((a: string, b: string) => new Date(b).getTime() - new Date(a).getTime())[0];
};
