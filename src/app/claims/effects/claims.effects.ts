import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { ClaimsService } from '../services';
import { ClaimsListActions } from '../actions';

import * as fromClaims from '../reducers';

@Injectable()
export class ClaimsEffects {
    fetch$: Observable<Action> = createEffect(() =>
        this._actions.pipe(
            ofType(ClaimsListActions.fetch),
            withLatestFrom(this._store.pipe(select(fromClaims.getHasClaimsLoaded))),
            filter(([action, hasLoaded]) => !hasLoaded),
            switchMap(() =>
                this._claims.getClaimsList().pipe(
                    map(claims => ClaimsListActions.fetchSuccess({ claims })),
                    catchError(() => of(ClaimsListActions.fetchSuccess({ claims: [] })))
                )
            )
        )
    );

    constructor(
        private _actions: Actions,
        private _store: Store<fromClaims.State>,
        private _claims: ClaimsService) {
    }
}
