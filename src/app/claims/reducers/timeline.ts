import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { TimelineItem } from '../models';
import { TimelineActions } from '../actions';

export interface State extends EntityState<TimelineItem> { }

const adapter: EntityAdapter<TimelineItem> = createEntityAdapter({
    sortComparer: false,
    selectId: (item: TimelineItem) => item.eventType
});

const initialState: State = adapter.getInitialState();

export const timelineReducer = createReducer(
    initialState,
    on(TimelineActions.fetchSuccess, (state, { timeline }) => adapter.setAll(timeline, state))
);

export function reducer(state: State, action: Action) {
    return timelineReducer(state, action);
}

export const { selectAll: getAll } = adapter.getSelectors();
