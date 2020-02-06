import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import { SignupActions } from '../actions';
import { AuthService } from '../services';

@Injectable()
export class VerifySMSEffects {
    verifySMS$: Observable<Action> = createEffect(() =>
        this._actions.pipe(
            ofType(SignupActions.verifySMS),
            exhaustMap(({ code }) =>
                this._auth.verifySMS(code).pipe(
                    map(() => SignupActions.verifySMSSuccess()),
                    catchError(() => of(SignupActions.verifySMSFailed()))
                )
            )
        )
    );

    resendSMS$: Observable<Action> = createEffect(() =>
        this._actions.pipe(
            ofType(SignupActions.resendSMS),
            exhaustMap(() =>
                this._auth.resendSMS().pipe(
                    map(() => SignupActions.resendSMSSuccess()),
                    catchError(() => of(SignupActions.resendSMSFailure()))
                )
            )
        )
    );

    verifySMSRedirect$: Observable<Action> = createEffect(() =>
        this._actions.pipe(
            ofType(SignupActions.verifySMSSuccess),
            tap(() => this._router.navigate(['/rejestracja/pin']))
        ), { dispatch: false }
    );

    constructor(
        private _actions: Actions,
        private _router: Router,
        private _auth: AuthService) {
    }
}