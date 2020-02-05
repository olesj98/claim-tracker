import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import { AuthService } from '../services';
import { SignupActions } from '../actions';

@Injectable()
export class ConfigPINEffects {
    configurePIN$: Observable<Action> = createEffect(() =>
        this._actions.pipe(
            ofType(SignupActions.configPIN),
            exhaustMap(({ data }) =>
                this._auth.configurePIN(data).pipe(
                    map(() => SignupActions.configPINSuccess()),
                    catchError(() => of(SignupActions.configPINFailed()))
                )
            )
        )
    );

    configurePINRedirect$: Observable<Action> = createEffect(() =>
        this._actions.pipe(
            ofType(SignupActions.configPINSuccess),
            tap(() => this._router.navigate(['/rejestracja/ok']))
        ), { dispatch: false }
    );

    constructor(
        private _actions: Actions,
        private _router: Router,
        private _auth: AuthService) {
    }
}
