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

    signup$: Observable<Action> = createEffect(() =>
        this._actions.pipe(
            ofType(SignupActions.signup),
            exhaustMap(({ data }) =>
                this._auth.signup(data).pipe(
                    map(() => SignupActions.signupSuccess()),
                    catchError(() => of(SignupActions.signupFailed()))
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

    signupRedirect$: Observable<Action> = createEffect(() =>
        this._actions.pipe(
            ofType(SignupActions.signupSuccess),
            tap(() => this._router.navigate(['/rejestracja/ok']))
        ), { dispatch: false }
    );

    constructor(
        private _actions: Actions,
        private _router: Router,
        private _auth: AuthService) {
    }
}
