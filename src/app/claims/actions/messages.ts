import { createAction, props } from '@ngrx/store';

import { DraftMessage, Message } from '../models';

export const fetchSuccess = createAction('[Messages] Fetch Success', props<{ messages: Array<Message> }>());

export const refresh = createAction('[Messages] Refresh');

export const send = createAction('[Messages] Send', props<{ message: DraftMessage }>());
export const sendSuccess = createAction('[Messages] Send Success', props<{ message: Message }>());
export const sendFailure = createAction('[Messages] Send Failure', props<{ message: DraftMessage }>());

export const getUnreadMessagesCountSuccess = createAction('[Messages] Get Unread Messages Count Success', props<{ count: number }>());
export const getUnreadMessagesCountFailure = createAction('[Messages] Get Unread Messages Count Failure');

export const markAllAsReadSuccess = createAction('[Messages] Mark All As Read Success');
export const markAllAsReadFailure = createAction('[Messages] Mark All As Read Failure');

export const enterMessengerView = createAction('[Messages] Enter Messenger View');
export const flushMessengerView = createAction('[Messages] Flush Messenger View');
