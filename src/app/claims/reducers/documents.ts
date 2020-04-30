import { Action, createReducer, on } from '@ngrx/store';

import { DocumentReference } from '../models';
import { ClaimDetailsActions, DocumentsActions } from '../actions';

export interface State {
    staticDocuments: Array<DocumentReference>;
    sharedDocuments: Array<DocumentReference>;
    documentTypes: Array<string>;
}

export const initialState: State = {
    staticDocuments: [],
    sharedDocuments: [],
    documentTypes: []
};

export const documentsReducer = createReducer(
    initialState,
    on(DocumentsActions.fetchStaticDocumentsSuccess, (state, { documents }) =>
        ({ ...state, staticDocuments: documents })),
    on(DocumentsActions.fetchSharedDocumentsSuccess, (state, { documents }) =>
        ({ ...state, sharedDocuments: documents })),
    on(DocumentsActions.fetchDocumentTypesSuccess, (state, { types }) =>
        ({ ...state, documentTypes: types })),
    on(ClaimDetailsActions.flush, () => initialState)
);

export function reducer(state: State, action: Action) {
    return documentsReducer(state, action);
}

export const getStaticDocuments = (state: State) => state.staticDocuments;
export const getSharedDocuments = (state: State) => state.sharedDocuments;
export const getDocumentTypes = (state: State) => state.documentTypes;
