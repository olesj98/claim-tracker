import { createAction, props } from '@ngrx/store';

import { Signup, SignupPIN } from '../models';

export const verify = createAction('[Auth] Verify', props<{ data: Signup }>());
export const verifySuccess = createAction('[Auth] Verify Success');
export const verifyFailed = createAction('[Auth] Verify Failed');

export const verifySMS = createAction('[Auth] Verify SMS', props<{ code: string }>());
export const verifySMSSuccess = createAction('[Auth] Verify SMS Success');
export const verifySMSFailed = createAction('[Auth] Verify SMS Failed');

export const resendSMS = createAction('[Auth] Resend SMS');
export const resendSMSSuccess = createAction('[Auth] Resend SMS Success');
export const resendSMSFailure = createAction('[Auth] Resend SMS Failure');

export const configPIN = createAction('[Auth] Configure PIN', props<{ data: SignupPIN }>());
export const configPINSuccess = createAction('[Auth] Configure PIN Success');
export const configPINFailed = createAction('[Auth] Configure PIN Failed');
