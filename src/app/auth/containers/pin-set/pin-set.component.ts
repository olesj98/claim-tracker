import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { SignupPIN } from '../../models';
import { SignupActions } from '../../actions';

import * as fromAuth from '../../reducers';

@Component({
    selector: 'pko-pin-set',
    templateUrl: './pin-set.component.pug',
    styleUrls: [ './pin-set.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PinSetComponent {
    constructor(private _store: Store<fromAuth.State>) { }

    onPINCreated(pin: SignupPIN): void {
        this._store.dispatch(SignupActions.configPIN({ data: pin }));
    }
}
