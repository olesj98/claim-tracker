import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
export class MessagesComponent implements OnInit, OnDestroy {
    messages$: Observable<Array<Message>>;
    unreadMessagesCount$: Observable<number>;

    constructor(private _store: Store<fromClaims.State>,
                private _route: ActivatedRoute) {
        this.messages$ = this._store.pipe(select(fromClaims.getMessagesList));
        this.unreadMessagesCount$ = this._store.pipe(select(fromClaims.getUnreadMessageCount));
    }

    ngOnInit(): void {
        this._store.dispatch(MessagesActions.enterMessengerView());
    }

    onSendMessage(message: DraftMessage): void {
        this._store.dispatch(MessagesActions.send({ message }));
    }

    ngOnDestroy(): void {
        this._store.dispatch(MessagesActions.flushMessengerView());
    }
}
