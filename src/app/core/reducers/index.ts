import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';

export interface State { }

export const reducers: ActionReducerMap<State> = { };

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<State>>('reducers.root', {
    factory: () => reducers
});
