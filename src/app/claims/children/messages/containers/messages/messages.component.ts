import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

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
    instantFocusRequired$: Observable<boolean>;

    constructor(private _store: Store<fromClaims.State>,
                private _route: ActivatedRoute) {
        this.messages$ = this._store.pipe(select(fromClaims.getMessagesList));
        this.instantFocusRequired$ = this._route.queryParamMap
            .pipe(map(queryParams => queryParams.get('focus') === 'keep'), take(1));
    }

    ngOnInit(): void {
        this._store.dispatch(MessagesActions.enterMessengerView());
    }

    onSendMessage(message: DraftMessage): void {
        this._store.dispatch(MessagesActions.send({ message }));
    }
}
