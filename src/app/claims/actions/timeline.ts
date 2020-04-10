import { createAction, props } from '@ngrx/store';

import { DocumentChangeEvent } from '@pko/shared/file-upload';

import { SendAccountNumberBody, TimelineInteractionEvent, TimelineTab } from '../models';

export const enterTimelineView = createAction('[Timeline] Enter View');

export const fetchSuccess = createAction('[Timeline] Fetch Success', props<{ timeline: Array<TimelineTab> }>());

export const sendAccountNumber = createAction('[Timeline] Send Account Number',
    props<{ event: TimelineInteractionEvent<SendAccountNumberBody> }>());

export const sendAccountNumberSuccess = createAction('[Timeline] Send Account Number Success');
export const sendAccountNumberFailure = createAction('[Timeline] Send Account Number Failure');

export const sendDocument = createAction('[Timeline] Send Document',
    props<{ event: TimelineInteractionEvent<DocumentChangeEvent> }>());
export const sendDocumentSuccess = createAction('[Timeline] Send Document Success');
export const sendDocumentFailure = createAction('[Timeline] Send Document Failure');
