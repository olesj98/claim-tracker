import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer } from '@ngrx/store';

import { MenuTab } from '@pko/commons/navigation';
import { claimsChildMenuTabs } from '../constants';

export interface State extends EntityState<MenuTab> { }

export const adapter: EntityAdapter<MenuTab> = createEntityAdapter({
    sortComparer: false,
    selectId: (tab: MenuTab) => tab.link
});

export const initialState = adapter.addAll(claimsChildMenuTabs, adapter.getInitialState());

export const menuReducer = createReducer(initialState);

export function reducer(state: State | undefined, action: Action) {
    return menuReducer(state, action);
}

export const { selectAll: getAll } = adapter.getSelectors();
