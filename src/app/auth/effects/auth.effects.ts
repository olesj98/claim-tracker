import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import { AuthService } from '../services';
import { LoginActions, SignupActions } from '../actions';

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

    verify$: Observable<Action> = createEffect(() =>
        this._actions.pipe(
            ofType(SignupActions.verify),
            exhaustMap(({ data }) =>
                this._auth.verify(data).pipe(
                    map(() => SignupActions.verifySuccess()),
                    catchError(() => of(SignupActions.verifyFailed()))
                )
            )
        )
    );

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

    signinRedirect$: Observable<Action> = createEffect(() =>
        this._actions.pipe(
            ofType(LoginActions.loginSuccess),
            tap(() => this._router.navigate(['/']))
        ), { dispatch: false }
    );

    verifyRedirect$: Observable<Action> = createEffect(() =>
        this._actions.pipe(
            ofType(SignupActions.verifySuccess),
            tap(() => this._router.navigate(['/rejestracja/pin']))
        ), { dispatch: false }
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
