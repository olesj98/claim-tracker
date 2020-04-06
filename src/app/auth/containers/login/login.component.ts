import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { HttpError } from '@pko/core';

import { Credentials } from '../../models';
import { AuthFormActions, LoginActions } from '../../actions';

import * as fromAuth from '../../reducers';

@Component({
    selector: 'pko-login',
    templateUrl: './login.component.pug',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnDestroy {
    error$: Observable<HttpError>;

    constructor(private _store: Store<fromAuth.State>) {
        this.error$ = this._store.pipe(select(fromAuth.getAuthFormError));
    }

    authorize(credentials: Credentials): void {
        this._store.dispatch(LoginActions.login({ credentials }));
    }

    flush(): void {
        this._store.dispatch(AuthFormActions.flush());
    }

    ngOnDestroy(): void {
        this.flush();
    }
}
