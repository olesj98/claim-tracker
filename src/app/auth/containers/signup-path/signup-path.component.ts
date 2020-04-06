import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { RegistrationPathActions } from '../../actions';

@Component({
    selector: 'pko-signup-path',
    templateUrl: './signup-path.component.pug',
    styleUrls: ['./signup-path.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupPathComponent implements OnDestroy {
    constructor(private _store: Store) { }

   ngOnDestroy(): void {
        this._store.dispatch(RegistrationPathActions.flush());
   }
}
