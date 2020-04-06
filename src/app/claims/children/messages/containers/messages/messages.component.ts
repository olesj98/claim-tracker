import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { DraftMessage, Message } from '@pko/claims/models';
import { MessagesActions } from '@pko/claims/actions';

import * as fromClaims from '@pko/claims/reducers';

@Component({
    selector: 'pko-messages',
    templateUrl: './messages.component.pug',
    styleUrls: ['./messages.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesComponent implements OnInit {
    messages$: Observable<Array<Message>>;

    constructor(private _store: Store<fromClaims.State>) {
        this.messages$ = this._store.pipe(select(fromClaims.getMessagesList));
    }

    ngOnInit(): void {
        this._store.dispatch(MessagesActions.fetch());
    }

    onSendMessage(message: DraftMessage): void {
        this._store.dispatch(MessagesActions.send({ message }));
    }
}
