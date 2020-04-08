import { createAction, props } from '@ngrx/store';

import { TimelineItem } from '../models';

export const enterTimelineView = createAction('[Timeline] Enter View');

export const fetchSuccess = createAction('[Timeline] Fetch Success', props<{ timeline: Array<TimelineItem> }>());
