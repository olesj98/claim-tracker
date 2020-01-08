import { Component, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Thread } from '@pko/claims/models';
import { User } from '@pko/auth/models';

import * as fromClaims from '@pko/claims/reducers';
import * as fromAuth from '@pko/auth/reducers';

@Component({
    selector: 'pko-messages',
    templateUrl: './messages.component.pug',
    styleUrls: ['./messages.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesComponent {
    threads$: Observable<Array<Thread>>;
    user$: Observable<User>;

    messageFormShowing: boolean;

    constructor(private _store: Store<fromClaims.State & fromAuth.State>) {
        this.threads$ = this._store.pipe(select(fromClaims.getThreadsList));
        this.user$ = this._store.pipe(select(fromAuth.getUser));
    }
}
