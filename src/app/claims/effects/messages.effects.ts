import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { MessagesService } from '../services';
import { MessagesActions } from '../actions';

import * as fromClaims from '../reducers';

@Injectable()
export class MessagesEffects {
    fetch$: Observable<Action> = createEffect(() =>
        this._actions.pipe(
            ofType(MessagesActions.enterMessengerView),
            withLatestFrom(this._store.pipe(select(fromClaims.getSelectedClaim))),
            switchMap(([ action, claim ]) =>
                this._messages.getMessages(claim).pipe(
                    map(messages => MessagesActions.fetchSuccess({ messages })),
                    catchError(() => of(MessagesActions.fetchSuccess({ messages: [] })))
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
            withLatestFrom(this._store.pipe(select(fromClaims.getSelectedClaim))),
            filter(([action, claim]) => claim.unreadMessagesCount > 0),
            switchMap(([action, claim]) =>
                this._messages.markAllAsRead(claim).pipe(
                    map(() => MessagesActions.markAllAsReadSuccess({ id: claim.businessNumber })),
                    catchError(() => of(MessagesActions.markAllAsReadFailure()))
                )
            )
        )
    );

    constructor(
        private _actions: Actions,
        private _store: Store<fromClaims.State>,
        private _messages: MessagesService) {
    }
}
