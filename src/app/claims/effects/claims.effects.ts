import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ClaimsService } from '../services';
import { ClaimsListActions } from '../actions';

@Injectable()
export class ClaimsEffects {
    fetch$: Observable<Action> = createEffect(() =>
        this._actions.pipe(
            ofType(ClaimsListActions.fetch),
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
        private _claims: ClaimsService) {
    }
}
