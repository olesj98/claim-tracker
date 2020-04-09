import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { DocumentsActions } from '@pko/claims/actions';
import { DocumentLinkRel, DocumentReference } from '@pko/claims/models';
import { TrackerLayoutService } from '@pko/tracker/services';
import { ClaimDocumentTypesDictionaryService } from '@pko/claims/services';
import { DocumentChangeEvent } from '@pko/shared/file-upload';

import * as fromClaims from '@pko/claims/reducers';

@Component({
    selector: 'pko-documents',
    templateUrl: './documents.component.pug',
    styleUrls: ['./documents.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentsComponent implements OnInit {
    sharedDocuments$: Observable<Array<DocumentReference>>;
    staticDocuments$: Observable<Array<DocumentReference>>;

    documentTypes$: Observable<Array<string>>;
    mobile$: Observable<boolean>;

    addDocumentOpened: boolean;
    DocumentRelGet = DocumentLinkRel.File;

    constructor(
        private _store: Store<fromClaims.State>,
        private _trackerLayout: TrackerLayoutService,
        private _documentTypes: ClaimDocumentTypesDictionaryService) {

        this.sharedDocuments$ = this._store.pipe(select(fromClaims.getSharedDocuments));
        this.staticDocuments$ = this._store.pipe(select(fromClaims.getStaticDocuments));

        this.documentTypes$ = this._documentTypes.getDocumentTypes();
        this.mobile$ = this._trackerLayout.minified$;
    }

    ngOnInit() {
        this._store.dispatch(DocumentsActions.enterDocumentsView());
    }

    onDocumentDropped(event: DocumentChangeEvent) {
        this._store.dispatch(DocumentsActions.share({ document: event }));
    }
}
