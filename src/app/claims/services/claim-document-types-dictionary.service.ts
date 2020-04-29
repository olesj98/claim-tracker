import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { hrefGet } from '@pko/core';

import { Claim, ClaimLinkRel } from '../models';

@Injectable({ providedIn: 'root' })
export class ClaimDocumentTypesDictionaryService {
    constructor(private _http: HttpClient) { }

    getDocumentTypes(claim: Claim): Observable<Array<string>> {
        return this._http.get<Array<string>>(hrefGet(claim.links, ClaimLinkRel.DocumentTypes));
    }
}
