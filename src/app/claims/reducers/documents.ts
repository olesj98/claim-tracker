import { Action, createReducer, on } from '@ngrx/store';

import { DocumentReference } from '../models';
import { DocumentsActions } from '../actions';

export interface State {
    staticDocuments: Array<DocumentReference>;
    sharedDocuments: Array<DocumentReference>;
}

export const initialState: State = {
    staticDocuments: [],
    sharedDocuments: []
};

export const documentsReducer = createReducer(
    initialState,
    on(DocumentsActions.fetchStaticDocumentsSuccess, (state, { documents }) =>
        ({ ...state, staticDocuments: documents })),
    on(DocumentsActions.fetchSharedDocumentsSuccess, (state, { documents }) =>
        ({ ...state, sharedDocuments: documents }))
);

export function reducer(state: State, action: Action) {
    return documentsReducer(state, action);
}

export const getStaticDocuments = (state: State) => state.staticDocuments;
export const getSharedDocuments = (state: State) => state.sharedDocuments;
