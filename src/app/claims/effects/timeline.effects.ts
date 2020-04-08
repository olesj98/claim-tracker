import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { TimelineService } from '../services';
import { TimelineActions } from '../actions';

import * as fromClaims from '../reducers';

@Injectable()
export class TimelineEffects {
    fetch$: Observable<Action> = createEffect(() =>
        this._actions.pipe(
            ofType(TimelineActions.enterTimelineView),
            withLatestFrom(this._store.pipe(select(fromClaims.getSelectedClaimId))),
            switchMap(([action, claimUUID]) =>
                this._timeline.getTimeline(claimUUID).pipe(
                    map(timeline => TimelineActions.fetchSuccess({ timeline })),
                    catchError(() => of(TimelineActions.fetchSuccess({ timeline: [] })))
                )
            )
        )
    );

    constructor(
        private _actions: Actions,
        private _store: Store<fromClaims.State>,
        private _timeline: TimelineService) {
    }
}
