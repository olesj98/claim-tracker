import { createAction, props } from '@ngrx/store';

import { DocumentChangeEvent } from '@pko/shared/file-upload';

import { DocumentReference } from '../models';

export const enterDocumentsView = createAction('[Documents] Enter View');

export const fetchSharedDocumentsSuccess = createAction('[Documents] Fetch Shared Documents Success',
    props<{ documents: Array<DocumentReference> }>());

export const fetchStaticDocumentsSuccess = createAction('[Documents] Fetch Static Documents Success',
    props<{ documents: Array<DocumentReference> }>());

export const share = createAction('[Documents] Share',
    props<{ document: DocumentChangeEvent }>());
export const shareSuccess = createAction('[Documents] Share Success');
export const shareFailure = createAction('[Documents] Share Failure');

export const fetchDocumentTypesSuccess = createAction('[Documents] Fetch Document Types Success', props<{ types: Array<string> }>());
