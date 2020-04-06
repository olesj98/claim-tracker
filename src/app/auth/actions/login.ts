import { createAction, props } from '@ngrx/store';

import { HttpError } from '@pko/core';

import { Credentials } from '../models';

export const login = createAction('[Auth] Login', props<{ credentials: Credentials }>());
export const loginSuccess = createAction('[Auth] Login Success');
export const loginFailed = createAction('[Auth] Login Failed', props<{ error: HttpError }>());

export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');
