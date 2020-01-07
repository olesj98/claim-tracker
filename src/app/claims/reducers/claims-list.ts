import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Claim } from '../models';
import { ClaimsListActions } from '../actions';
import { FAKE_CLAIMS } from '../constants';

export interface State extends EntityState<Claim> {
    selectedClaimId: string;
}

export const adapter: EntityAdapter<Claim> = createEntityAdapter({
    sortComparer: false,
    selectId: (claim: Claim) => claim.id
});

export const initialState: State = adapter.addAll(FAKE_CLAIMS, adapter.getInitialState({
    selectedClaimId: null
}));

export const claimsListReducer = createReducer(
    initialState,
    on(ClaimsListActions.select, (state, { id }) => ({ ...state, selectedClaimId: id }))
);

export function reducer(state: State | undefined, action: Action) {
    return claimsListReducer(state, action);
}

export const {
    selectAll: getClaims,
    selectEntities: getEntities
} = adapter.getSelectors();

export const getSelectedClaimId = (state: State) => state.selectedClaimId;
