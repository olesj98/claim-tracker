import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Credentials } from '../../models';
import { LoginActions } from '../../actions';

import * as fromAuth from '../../reducers';

@Component({
    selector: 'pko-login',
    templateUrl: './login.component.pug',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
    constructor(private _store: Store<fromAuth.State>) { }

    authorize(credentials: Credentials): void {
        this._store.dispatch(LoginActions.login({ credentials }));
    }
}
