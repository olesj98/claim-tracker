import { InjectionToken } from '@angular/core';
import { Action, ActionReducerMap } from '@ngrx/store';

export interface State { }

export const reducers: ActionReducerMap<State, Action> = { };

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<State, Action>>('reducers.root', {
    factory: () => reducers
});
