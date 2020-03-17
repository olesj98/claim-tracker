import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
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
                    tap(user => localStorage.setItem('_user', JSON.stringify(user))),
                    map(user => LoginActions.loginSuccess({ user })),
                    catchError(() => of(LoginActions.loginFailed()))
                )
            )
        )
    );

    logout$: Observable<Action> = createEffect(() =>
        this._actions.pipe(
            ofType(LoginActions.logout),
            tap(() => {
                localStorage.removeItem('_user');
                this._router.navigate(['/login']);
            })
        ), { dispatch: false }
    );

    signinRedirect$: Observable<Action> = createEffect(() =>
        this._actions.pipe(
            ofType(LoginActions.loginSuccess),
            tap(() => this._router.navigate(['/']))
        ), { dispatch: false }
    );

    constructor(
        private _actions: Actions,
        private _router: Router,
        private _auth: AuthService) {
    }
}
