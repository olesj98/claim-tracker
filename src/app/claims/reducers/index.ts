import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '@pko/core/reducers';
import * as fromClaimsList from './claims-list';

export interface ClaimsState {
    claimsList: fromClaimsList.State;
}

export interface State extends fromRoot.State {
    claims: ClaimsState;
}

export const reducers: ActionReducerMap<ClaimsState> = {
    claimsList: fromClaimsList.reducer
};

export const getClaimsState = createFeatureSelector<State, ClaimsState>('claims');

export const getClaimsListState = createSelector(getClaimsState, state => state.claimsList);
export const getClaimsList      = createSelector(getClaimsListState, fromClaimsList.getClaims);
export const getClaimsEntities  = createSelector(getClaimsListState, fromClaimsList.getEntities);
export const getSelectedClaimId = createSelector(getClaimsListState, fromClaimsList.getSelectedClaimId);
export const getSelectedClaim   = createSelector(
    getClaimsEntities,
    getSelectedClaimId,
    (entities, id) => entities[id]
);
