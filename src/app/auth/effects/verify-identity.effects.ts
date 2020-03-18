import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import { AuthService } from '../services';
import { SignupActions } from '../actions';

@Injectable()
export class VerifyIdentityEffects {
  verifyIdentity$: Observable<Action> = createEffect(() =>
    this._actions.pipe(
      ofType(SignupActions.verify),
      exhaustMap(({ data }) =>
        this._auth.verify(data).pipe(
          map(() => SignupActions.verifySuccess()),
          catchError(error => of(SignupActions.verifyFailed({ err: error?.error })))
        )
      )
    )
  );

  verifyIdentityRedirect$: Observable<Action> = createEffect(() =>
    this._actions.pipe(
      ofType(SignupActions.verifySuccess),
      tap(() => this._router.navigate(['/registration/sms']))
    ), { dispatch: false }
  );

  constructor(
    private _actions: Actions,
    private _router: Router,
    private _auth: AuthService) {
  }
}
