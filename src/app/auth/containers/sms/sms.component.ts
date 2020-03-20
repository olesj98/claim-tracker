import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { SignupActions } from '../../actions';

import * as fromAuth from '../../reducers';
import { SmsVerification } from '@pko/auth/models';

@Component({
    selector: 'pko-sms',
    templateUrl: './sms.component.pug',
    styleUrls: [ './sms.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SMSComponent {
    constructor(private _store: Store<fromAuth.State>) { }

    onCodeReceived(data: SmsVerification): void {
        this._store.dispatch(SignupActions.verifySMS({ data }));
    }

    onResendSMS(): void {
        this._store.dispatch(SignupActions.resendSMS());
    }
}
