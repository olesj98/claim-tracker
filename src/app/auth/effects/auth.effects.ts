import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import { AuthService } from '../services';
import { LoginActions } from '../actions';

@Injectable()
export class AuthEffects {
    signin$: Observable<Action> = createEffect(() =>
        this._actions.pipe(
            ofType(LoginActions.login),
            exhaustMap(({ credentials }) =>
                this._auth.signin(credentials).pipe(
                    tap(() => this._router.navigate(['/'])),
                    map(() => LoginActions.loginSuccess()),
                    catchError(({ error }) => of(LoginActions.loginFailed({ error })))
                )
            )
        )
    );

    logout$: Observable<Action> = createEffect(() =>
        this._actions.pipe(
            ofType(LoginActions.logout),
            exhaustMap(() =>
                this._auth.quit().pipe(
                    tap(() => this._router.navigate(['/login'])),
                    map(() => LoginActions.logoutSuccess()),
                    catchError(() => EMPTY)
                )
            )
        )
    );

    constructor(
        private _actions: Actions,
        private _router: Router,
        private _auth: AuthService) {
    }
}
