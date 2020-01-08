import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer } from '@ngrx/store';

import { Thread } from '../models';
import { threads } from '../constants';

export interface State extends EntityState<Thread> { }

export const adapter: EntityAdapter<Thread> = createEntityAdapter({
    sortComparer: false,
    selectId: (thread: Thread) => thread.id
});

export const initialState: State = adapter.addAll(threads, adapter.getInitialState());

export const messagesReducer = createReducer(initialState);

export function reducer(state: State | undefined, action: Action) {
    return messagesReducer(state, action);
}

export const { selectAll: getAll } = adapter.getSelectors();
