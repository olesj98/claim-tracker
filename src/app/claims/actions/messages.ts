import { createAction, props } from '@ngrx/store';

import { DraftMessage, Message } from '../models';

export const fetch = createAction('[Messages] Fetch');
export const fetchSuccess = createAction('[Messages] Fetch Success', props<{ messages: Array<Message> }>());

export const send = createAction('[Messages] Send', props<{ message: DraftMessage }>());
export const sendSuccess = createAction('[Messages] Send Success', props<{ message: Message }>());
export const sendFailure = createAction('[Messages] Send Failure', props<{ message: DraftMessage }>());

export const markAllAsRead = createAction('[Messages] Mark All As Read');
export const markAllAsReadSuccess = createAction('[Messages] Mark All As Read Success', props<{ id: string }>());
export const markAllAsReadFailure = createAction('[Messages] Mark All As Read Failure');

export const enterMessengerView = createAction('[Messages] Enter Messenger View');
