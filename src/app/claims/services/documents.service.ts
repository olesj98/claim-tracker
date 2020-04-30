import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { hrefGet } from '@pko/core';

import { Claim, ClaimLinkRel, DocumentReference } from '../models';

@Injectable({ providedIn: 'root' })
export class DocumentsService {
    constructor(private _http: HttpClient) { }

    getStaticDocuments(claim: Claim): Observable<Array<DocumentReference>> {
        return this._http.get<Array<DocumentReference>>(hrefGet(claim.links, ClaimLinkRel.ClientDocuments));
    }

    getSharedDocuments(claim: Claim): Observable<Array<DocumentReference>> {
        return this._http.get<Array<DocumentReference>>(hrefGet(claim.links, ClaimLinkRel.SharedDocuments));
    }

    shareDocument(claim: Claim, documentType: string, files: Array<File>): Observable<void> {
        const formData = new FormData();

        formData.append('documentType', documentType);
        files.forEach(file => formData.append('files', file, file.name));

        return this._http.post<void>(hrefGet(claim.links, ClaimLinkRel.ClientDocuments), formData);
    }
}
