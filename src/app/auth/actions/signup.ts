import { createAction, props } from '@ngrx/store';

import { Signup } from '../models';

export const signup = createAction('[Auth] Signup', props<{ data: Signup }>());
export const signupSuccess = createAction('[Auth] Signup Success');
export const signupFailed = createAction('[Auth] Signup Failed');
