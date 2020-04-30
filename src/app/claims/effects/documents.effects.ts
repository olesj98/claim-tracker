import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { ClaimDocumentTypesDictionaryService, DocumentsService } from '../services';
import { DocumentsActions } from '../actions';

import * as fromClaims from '../reducers';

@Injectable()
export class DocumentsEffects {
    fetchStaticDocuments$: Observable<Action> = createEffect(() =>
        this._actions.pipe(
            ofType(DocumentsActions.enterDocumentsView, DocumentsActions.shareSuccess),
            withLatestFrom(this._store.pipe(select(fromClaims.getSelectedClaim))),
            switchMap(([action, claim]) =>
                this._documents.getStaticDocuments(claim).pipe(
                    map(documents => DocumentsActions.fetchStaticDocumentsSuccess({ documents })),
                    catchError(() => of(DocumentsActions.fetchStaticDocumentsSuccess({ documents: [] })))
                )
            )
        )
    );

    fetchSharedDocuments$: Observable<Action> = createEffect(() =>
        this._actions.pipe(
            ofType(DocumentsActions.enterDocumentsView),
            withLatestFrom(this._store.pipe(select(fromClaims.getSelectedClaim))),
            switchMap(([action, claim]) =>
                this._documents.getSharedDocuments(claim).pipe(
                    map(documents => DocumentsActions.fetchSharedDocumentsSuccess({ documents })),
                    catchError(() => of(DocumentsActions.fetchSharedDocumentsSuccess({ documents: [] })))
                )
            )
        )
    );

    share$: Observable<Action> = createEffect(() =>
        this._actions.pipe(
            ofType(DocumentsActions.share),
            withLatestFrom(this._store.pipe(select(fromClaims.getSelectedClaim))),
            exhaustMap(([{ document: { documentType, files } }, claim]) =>
                this._documents.shareDocument(claim, documentType, files[0]).pipe(
                    map(() => DocumentsActions.shareSuccess()),
                    catchError(() => of(DocumentsActions.shareFailure()))
                )
            )
        )
    );

    getDocumentTypes$: Observable<Action> = createEffect(() =>
        this._actions.pipe(
            ofType(DocumentsActions.enterDocumentsView),
            withLatestFrom(this._store.pipe(select(fromClaims.getSelectedClaim))),
            switchMap(([action, claim]) =>
                this._documentTypes.getDocumentTypes(claim).pipe(
                    map(types => DocumentsActions.fetchDocumentTypesSuccess({ types })),
                    catchError(() => of(DocumentsActions.fetchDocumentTypesSuccess({ types: [] })))
                )
            )
        )
    );

    constructor(
        private _actions: Actions,
        private _store: Store<fromClaims.State>,
        private _documentTypes: ClaimDocumentTypesDictionaryService,
        private _documents: DocumentsService) {
    }
}
