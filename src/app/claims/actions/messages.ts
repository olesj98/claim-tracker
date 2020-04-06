import { createAction, props } from '@ngrx/store';

import { DraftMessage, Message } from '../models';

export const fetch = createAction('[Messages] Fetch');
export const fetchSuccess = createAction('[Messages] Fetch Success', props<{ messages: Array<Message> }>());

export const send = createAction('[Messages] Send', props<{ message: DraftMessage }>());
export const sendSuccess = createAction('[Messages] Send Success', props<{ message: DraftMessage }>());
export const sendFailure = createAction('[Messages] Send Failure', props<{ message: DraftMessage }>());
