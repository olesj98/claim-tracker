import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { hrefGet, Link } from '@pko/core';
import { DocumentChangeEvent } from '@pko/shared/file-upload';

import { Claim, ClaimLinkRel, SendAccountNumberBody, TimelineTab } from '../models';

@Injectable({ providedIn: 'root' })
export class TimelineService {
    constructor(private _http: HttpClient) { }

    getTimeline(claim: Claim): Observable<Array<TimelineTab>> {
        return this._http.get<Array<TimelineTab>>(hrefGet(claim.links, ClaimLinkRel.Timeline));
    }

    sendAccountNumber(links: Array<Link>, body: SendAccountNumberBody): Observable<void> {
        return this._http.post<void>(hrefGet(links, ClaimLinkRel.AddAccountNumber), body);
    }

    sendDocument(links: Array<Link>, body: DocumentChangeEvent): Observable<void> {
        const formData = new FormData();
        body.files.forEach(file => formData.append('files', file, file.name));

        return this._http.post<void>(hrefGet(links, ClaimLinkRel.AddTimelineDocument), formData);
    }
}
