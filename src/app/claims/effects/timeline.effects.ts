import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { TimelineService } from '../services';
import { TimelineActions } from '../actions';

import * as fromClaims from '../reducers';

@Injectable()
export class TimelineEffects {
    fetch$: Observable<Action> = createEffect(() =>
        this._actions.pipe(
            ofType(
                TimelineActions.enterTimelineView,
                TimelineActions.sendAccountNumberSuccess,
                TimelineActions.sendDocumentSuccess),
            withLatestFrom(this._store.pipe(select(fromClaims.getSelectedClaim))),
            switchMap(([action, claim]) =>
                this._timeline.getTimeline(claim).pipe(
                    map(timeline => TimelineActions.fetchSuccess({ timeline })),
                    catchError(() => of(TimelineActions.fetchSuccess({ timeline: [] })))
                )
            )
        )
    );

    sendAccountNumber$: Observable<Action> = createEffect(() =>
        this._actions.pipe(
            ofType(TimelineActions.sendAccountNumber),
            exhaustMap(({ event: { links, value } }) =>
                this._timeline.sendAccountNumber(links, value).pipe(
                    map(() => TimelineActions.sendAccountNumberSuccess()),
                    catchError(() => of(TimelineActions.sendAccountNumberFailure()))
                )
            )
        )
    );

    sendDocuments$: Observable<Action> = createEffect(() =>
        this._actions.pipe(
            ofType(TimelineActions.sendDocument),
            exhaustMap(({ event: { links, value } }) =>
                this._timeline.sendDocument(links, value).pipe(
                    map(() => TimelineActions.sendDocumentSuccess()),
                    catchError(() => of(TimelineActions.sendDocumentFailure()))
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
