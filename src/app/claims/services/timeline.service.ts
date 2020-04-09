import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { hrefGet } from '@pko/core';

import { Claim, ClaimLinkRel, TimelineItem } from '../models';

@Injectable({ providedIn: 'root' })
export class TimelineService {
    constructor(private _http: HttpClient) { }

    getTimeline(claim: Claim): Observable<Array<TimelineItem>> {
        return this._http.get<Array<TimelineItem>>(hrefGet(claim.links, ClaimLinkRel.Timeline));
    }
}
