import { createAction, props } from '@ngrx/store';

import { User } from '../models';

export const fetch = createAction('[User] Fetch');
export const fetchSuccess = createAction('[User] Fetch Success', props<{ user: User }>());
export const fetchFailure = createAction('[User] Fetch Failure');
