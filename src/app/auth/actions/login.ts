import { createAction, props } from '@ngrx/store';

import { Credentials, User } from '../models';

export const login = createAction('[Auth] Login', props<{ credentials: Credentials }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ user: User }>());
export const loginFailed = createAction('[Auth] Login Failed');

export const logout = createAction('[Auth] Logout');
