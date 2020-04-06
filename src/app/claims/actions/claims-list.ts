import { createAction, props } from '@ngrx/store';

import { Claim } from '../models';

export const fetch = createAction('[Claims List] Fetch');
export const fetchSuccess = createAction('[Claims List] Fetch Success', props<{ claims: Array<Claim> }>());

export const select = createAction('[Claims List] Select', props<{ id: string }>());
