import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { Observable, of, timer, zip } from 'rxjs';
import { catchError, concatMap, filter, map, switchMap, take, takeUntil, withLatestFrom } from 'rxjs/operators';

import { MessagesService } from '../services';
import { ClaimDetailsActions, DocumentsActions, MessagesActions, TimelineActions } from '../actions';

import * as fromClaims from '../reducers';

@Injectable()
export class MessagesEffects {
    fetch$: Observable<Action> = createEffect(() =>
        this._actions.pipe(
            ofType(MessagesActions.enterMessengerView,
                MessagesActions.refresh),
            withLatestFrom(this._store.pipe(select(fromClaims.getSelectedClaim))),
            switchMap(([ action, claim ]) =>
                this._messages.getMessages(claim).pipe(
                    map(messages => MessagesActions.fetchSuccess({ messages })),
                    catchError(() => of(MessagesActions.fetchSuccess({ messages: [] })))
                )
            )
        )
    );

    messagesRefreshTick$: Observable<Action> = createEffect(() =>
        this._actions.pipe(
            ofType(MessagesActions.enterMessengerView),
            switchMap(() =>
                this._createMessagesPollingStrategy().pipe(
                    switchMap(() =>
                        this._actions.pipe(
                            ofType(MessagesActions.getUnreadMessagesCountSuccess),
                            filter(({ count }) => count > 0),
                            map(() => MessagesActions.refresh()),
                            takeUntil(this._actions.pipe(ofType(MessagesActions.flushMessengerView)))
                        )
                    )
                )
            )
        )
    );

    getUnreadCount$: Observable<Action> = createEffect(() =>
        this._actions.pipe(
            ofType(MessagesActions.enterMessengerView,
                TimelineActions.enterTimelineView,
                DocumentsActions.enterDocumentsView),
            withLatestFrom(this._store.pipe(select(fromClaims.getSelectedClaim))),
            switchMap(([ action, claim ]) =>
                timer(0, 60000).pipe(
                    switchMap(() =>
                        this._messages.getUnreadMessagesCount(claim).pipe(
                            map(({ unreadMessagesCount }) => MessagesActions.getUnreadMessagesCountSuccess({ count: unreadMessagesCount })),
                            catchError(() => of(MessagesActions.getUnreadMessagesCountFailure()))
                        )
                    ),
                    takeUntil(this._actions.pipe(ofType(ClaimDetailsActions.flush)))
                )
            )
        )
    );

    send$: Observable<Action> = createEffect(() =>
        this._actions.pipe(
            ofType(MessagesActions.send),
            withLatestFrom(this._store.pipe(select(fromClaims.getSelectedClaim))),
            concatMap(([{ message }, claim]) =>
                this._messages.sendMessage(message, claim).pipe(
                    map(response => MessagesActions.sendSuccess({ message: response })),
                    catchError(() => of(MessagesActions.sendFailure({ message })))
                )
            )
        )
    );

    markAllAsRead$: Observable<Action> = createEffect(() =>
        this._actions.pipe(
            ofType(MessagesActions.enterMessengerView),
            switchMap(() =>
                zip(this._actions.pipe(ofType(MessagesActions.fetchSuccess)),
                    this._actions.pipe(ofType(MessagesActions.getUnreadMessagesCountSuccess))).pipe(
                    withLatestFrom(
                        this._store.pipe(select(fromClaims.getSelectedClaim)),
                        this._store.pipe(select(fromClaims.getUnreadMessageCount)),
                        this._store.pipe(select(fromClaims.getLatestNotifiedMessage))),
                    filter(([actions, claim, unreadMessagesCount, readMessageDate]) => unreadMessagesCount > 0 && !!readMessageDate),
                    switchMap(([actions, claim, unreadMessagesCount, readMessageDate]) =>
                        this._messages.markAllAsRead(claim, readMessageDate).pipe(
                            map(() => MessagesActions.markAllAsReadSuccess()),
                            catchError(() => of(MessagesActions.markAllAsReadFailure()))
                        )
                    ),
                    takeUntil(this._actions.pipe(ofType(MessagesActions.flushMessengerView)))
                )
            )
        )
    );

    constructor(
        private _actions: Actions,
        private _store: Store<fromClaims.State>,
        private _messages: MessagesService) {
    }

    private _createMessagesPollingStrategy(): Observable<any> {
        return zip(this._actions.pipe(ofType(MessagesActions.fetchSuccess)),
            this._actions.pipe(ofType(MessagesActions.getUnreadMessagesCountSuccess))).pipe(take(1));
    }
}
