import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import * as fromAuth from '../reducers';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(
        private _store: Store<fromAuth.State>,
        private _router: Router) {
    }

    canActivateChild(): Observable<boolean> {
        return this.canActivate();
    }

    canActivate(): Observable<boolean> {
        return this._store.pipe(
            select(fromAuth.getIsUserLoggedIn),
            tap(authorized => {
                if (!authorized) {
                    this._router.navigate(['/login']);
                }
            }),
            take(1)
        );
    }
}
