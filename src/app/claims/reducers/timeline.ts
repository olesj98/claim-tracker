import { Action, createReducer, on } from '@ngrx/store';

import { TimelineTab } from '../models';
import { ClaimDetailsActions, TimelineActions } from '../actions';

export interface State {
    events: Array<TimelineTab>;
}

const initialState: State = {
    events: []
};

export const timelineReducer = createReducer(
    initialState,
    on(TimelineActions.fetchSuccess, (state, { timeline }) => ({ ...state, events: timeline })),
    on(ClaimDetailsActions.flush, () => initialState)
);

export function reducer(state: State, action: Action) {
    return timelineReducer(state, action);
}

export const getAll = (state: State) => state.events;
export const getCurrentTask = (state: State) => state.events.find(event => event.currentTask);
