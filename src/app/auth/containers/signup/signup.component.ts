import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Signup } from '../../models';
import { SignupActions } from '../../actions';

import * as fromAuth from '../../reducers';

@Component({
    selector: 'pko-signup',
    templateUrl: './signup.component.pug',
    styleUrls: ['./signup.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent {
    constructor(private _store: Store<fromAuth.State>) { }

    signup(data: Signup): void {
        this._store.dispatch(SignupActions.signup({ data }));
    }
}
