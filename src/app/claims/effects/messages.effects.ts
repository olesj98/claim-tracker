import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { MessagesService } from '../services';
import { MessagesActions } from '../actions';

import * as fromClaims from '../reducers';

@Injectable()
export class MessagesEffects {
    fetch$: Observable<Action> = createEffect(() =>
        this._actions.pipe(
            ofType(MessagesActions.fetch),
            withLatestFrom(this._store.pipe(select(fromClaims.getSelectedClaimId))),
            switchMap(([ action, claimUUID ]) =>
                this._messages.getMessages(claimUUID).pipe(
                    map(messages => MessagesActions.fetchSuccess({ messages })),
                    catchError(() => of(MessagesActions.fetchSuccess({ messages: [] })))
                )
            )
        )
    );

    send$: Observable<Action> = createEffect(() =>
        this._actions.pipe(
            ofType(MessagesActions.send),
            withLatestFrom(this._store.pipe(select(fromClaims.getSelectedClaimId))),
            concatMap(([{ message }, claimUUID]) =>
                this._messages.sendMessage(message, claimUUID).pipe(
                    map(() => MessagesActions.sendSuccess({ message })),
                    catchError(() => of(MessagesActions.sendFailure({ message })))
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
