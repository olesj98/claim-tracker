import { Component, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { HttpError } from '@pko/core';

import { SmsVerification } from '../../models';
import { SignupActions } from '../../actions';

import * as fromAuth from '../../reducers';

@Component({
    selector: 'pko-sms',
    templateUrl: './sms.component.pug',
    styleUrls: [ './sms.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SMSComponent {
    error$: Observable<HttpError>;
    resend$: Observable<boolean>;

    constructor(private _store: Store<fromAuth.State>) {
        this.error$ = this._store.pipe(select(fromAuth.getRegistrationSmsError));
        this.resend$ = this._store.pipe(select(fromAuth.getRegistrationSmsResend));
    }

    onCodeReceived(data: SmsVerification): void {
        this._store.dispatch(SignupActions.verifySMS({ data }));
    }

    onResendSMS(): void {
        this._store.dispatch(SignupActions.resendSMS());
    }
}
