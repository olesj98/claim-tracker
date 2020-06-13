import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { fromRoot } from '@pko/core';

import * as fromClaimsList from './claims-list';
import * as fromMessages from './messages';
import * as fromTimeline from './timeline';
import * as fromDocuments from './documents';

export interface ClaimsState {
    claimsList: fromClaimsList.State;
    messages: fromMessages.State;
    timeline: fromTimeline.State;
    documents: fromDocuments.State;
}

export interface State extends fromRoot.State {
    claims: ClaimsState;
}

export const reducers: ActionReducerMap<ClaimsState> = {
    claimsList: fromClaimsList.reducer,
    messages: fromMessages.reducer,
    timeline: fromTimeline.reducer,
    documents: fromDocuments.reducer
};

export const getClaimsState = createFeatureSelector<State, ClaimsState>('claims');

export const getClaimsListState = createSelector(getClaimsState, state => state.claimsList);
export const getClaimsList = createSelector(getClaimsListState, fromClaimsList.getClaims);
export const getClaimsEntities = createSelector(getClaimsListState, fromClaimsList.getEntities);
export const getSelectedClaimId = createSelector(getClaimsListState, fromClaimsList.getSelectedClaimId);
export const getHasClaimsLoaded = createSelector(getClaimsListState, fromClaimsList.getHasLoaded);
export const getClaimsSize = createSelector(getClaimsListState, fromClaimsList.getTotal);
export const getHasManyClaims = createSelector(getClaimsSize, size => size > 1);
export const getSelectedClaim = createSelector(
    getClaimsEntities,
    getSelectedClaimId,
    (entities, id) => entities[id]
);

export const getMessagesState = createSelector(getClaimsState, state => state.messages);
export const getMessagesList = createSelector(getMessagesState, fromMessages.getAll);
export const getUnreadMessageCount = createSelector(getMessagesState, fromMessages.getUnreadMessagesCount);
export const getLatestNotifiedMessage = createSelector(getMessagesList, fromMessages.getLatestByNotificationDate);

export const getFeedsState = createSelector(getClaimsState, state => state.timeline);
export const getFeedsList = createSelector(getFeedsState, fromTimeline.getAll);
export const getLatestFeed = createSelector(getFeedsState, fromTimeline.getCurrentTask);

export const getDocumentsState = createSelector(getClaimsState, state => state.documents);
export const getStaticDocuments = createSelector(getDocumentsState, fromDocuments.getStaticDocuments);
export const getSharedDocuments = createSelector(getDocumentsState, fromDocuments.getSharedDocuments);
export const getDocumentTypes = createSelector(getDocumentsState, fromDocuments.getDocumentTypes);
