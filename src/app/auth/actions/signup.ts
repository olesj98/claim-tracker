import { createAction, props } from '@ngrx/store';

import { Signup, SignupPIN } from '../models';

export const verify = createAction('[Auth] Verify', props<{ data: Signup }>());
export const verifySuccess = createAction('[Auth] Verify Success');
export const verifyFailed = createAction('[Auth] Verify Failed');

export const configPIN = createAction('[Auth] Configure PIN', props<{ data: SignupPIN }>());
export const configPINSuccess = createAction('[Auth] Configure PIN Success');
export const configPINFailed = createAction('[Auth] Configure PIN Failed');
