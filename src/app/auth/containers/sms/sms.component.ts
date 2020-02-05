import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { SignupActions } from '../../actions';

import * as fromAuth from '../../reducers';

@Component({
    selector: 'pko-sms',
    templateUrl: './sms.component.pug',
    styleUrls: [ './sms.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SMSComponent {
    constructor(private _store: Store<fromAuth.State>) { }

    onCodeReceived(code: string): void {
        this._store.dispatch(SignupActions.verifySMS({ code }));
    }

    onResendSMS(): void {

    }
}
