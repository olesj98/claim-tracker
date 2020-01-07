import { createAction, props } from '@ngrx/store';

export const select = createAction('[Claims List] Select', props<{ id: string }>());
