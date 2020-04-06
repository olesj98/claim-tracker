import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { AuthService } from '../services';
import { UserActions } from '../actions';

@Injectable()
export class UserEffects {
    fetch$: Observable<Action> = createEffect(() =>
        this._actions.pipe(
            ofType(UserActions.fetch),
            switchMap(() =>
                this._auth.getAuthorizedUser().pipe(
                    map(user => UserActions.fetchSuccess({ user })),
                    catchError(() => of(UserActions.fetchFailure()))
                )
            )
        )
    );

    constructor(
        private _actions: Actions,
        private _auth: AuthService) {
    }
}
