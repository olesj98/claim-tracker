import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { HttpError } from '@pko/core';

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
    error$: Observable<HttpError>;

    constructor(private _store: Store<fromAuth.State>) {
        this.error$ = this._store.pipe(select(fromAuth.getRegistrationVerificationError));
    }

    signup(data: Signup): void {
        this._store.dispatch(SignupActions.verify({ data }));
    }
}
