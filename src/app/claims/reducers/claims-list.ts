import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Claim } from '../models';
import { ClaimsListActions, MessagesActions } from '../actions';

export interface State extends EntityState<Claim> {
    selectedClaimId: string;
    pending: boolean;
    hasLoaded: boolean;
}

export const adapter: EntityAdapter<Claim> = createEntityAdapter({
    sortComparer: false,
    selectId: (claim: Claim) => claim.businessNumber
});

export const initialState: State = adapter.getInitialState({
    selectedClaimId: null,
    pending: false,
    hasLoaded: false
});

export const claimsListReducer = createReducer(
    initialState,
    on(ClaimsListActions.select, (state, { id }) => ({ ...state, selectedClaimId: id })),
    on(ClaimsListActions.fetchSuccess, (state , { claims }) =>
        adapter.setAll(claims, { ...state, pending: false, hasLoaded: true })),
    on(MessagesActions.markAllAsReadSuccess, (state, { id }) =>
        adapter.updateOne({ id, changes: { unreadMessagesCount: 0 } }, state))
);

export function reducer(state: State | undefined, action: Action) {
    return claimsListReducer(state, action);
}

export const {
    selectAll: getClaims,
    selectEntities: getEntities
} = adapter.getSelectors();

export const getSelectedClaimId = (state: State) => state.selectedClaimId;
export const getHasLoaded = (state: State) => state.hasLoaded;
export const getPending = (state: State) => state.pending;
