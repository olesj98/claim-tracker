import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, withLatestFrom } from 'rxjs/operators';

import { LoginActions } from '@pko/auth';

import { ClaimsListActions } from '../actions';
import { ClaimsService } from '../services';
import { Claim } from '../models';

import * as fromClaims from '../reducers';

@Injectable({ providedIn: 'root' })
export class ClaimListGuard implements CanActivate {
    constructor(
        private _router: Router,
        private _claims: ClaimsService,
        private _store: Store<fromClaims.State>) {
    }

    canActivate(): Observable<boolean> {
        return this._waitForClaimsToLoad().pipe(
            withLatestFrom(this._store.pipe(select(fromClaims.getClaimsList))),
            map(([_, claims]) => claims),
            tap(claims => this._displayDetailsIfOnlyOnePresent(claims)),
            map(claims => claims.length > 1),
            catchError(() => {
                this._store.dispatch(LoginActions.logout());
                return of(false);
            })
        );
    }

    private _waitForClaimsToLoad(): Observable<boolean> {
        return this._claims.getClaimsList().pipe(
            tap(claims => _checkIfAnyClaimsPresentOrThrow(claims)),
            map(claims => ClaimsListActions.fetchSuccess({ claims })),
            tap(action => this._store.dispatch(action)),
            map(claims => !!claims)
        );
    }

    private _displayDetailsIfOnlyOnePresent(claims: Array<Claim>): void {
        if (claims.length === 1) {
            this._router.navigate(['/szkody', claims[0].businessNumber]);
        }
    }
}

function _checkIfAnyClaimsPresentOrThrow(claims: Array<Claim>): void {
    if (!claims.length) {
        throw new Error('No claims were found.');
    }
}
