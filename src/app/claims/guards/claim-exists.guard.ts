import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, take, tap, withLatestFrom } from 'rxjs/operators';

import { ClaimsService } from '../services';
import { ClaimsListActions } from '../actions';

import * as fromClaims from '../reducers';

@Injectable({ providedIn: 'root' })
export class ClaimExistsGuard implements CanActivate {
    constructor(
        private _claims: ClaimsService,
        private _router: Router,
        private _store: Store<fromClaims.State>) {
    }

    private _waitForClaimsToLoad(): Observable<boolean> {
        return this._store.pipe(
            select(fromClaims.getHasClaimsLoaded),
            tap(hasLoaded => {
                if (!hasLoaded) {
                    this._store.dispatch(ClaimsListActions.fetch());
                }
            }),
            filter(hasLoaded => hasLoaded),
            take(1)
        );
    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this._waitForClaimsToLoad().pipe(
            withLatestFrom(this._store.pipe(select(fromClaims.getClaimsEntities))),
            map(([_, entities]) => !!entities[route.params.id]),
            tap(exists => {
                if (!exists) {
                    this._router.navigate(['/']);
                }
            })
        );
    }
}
