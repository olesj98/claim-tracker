import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@pko-env/environment';

import { TimelineItem } from '../models';

@Injectable({ providedIn: 'root' })
export class TimelineService {
    constructor(private _http: HttpClient) { }

    getTimeline(claimUUID: string): Observable<Array<TimelineItem>> {
        return this._http
            .get<Array<TimelineItem>>(`${environment.api.url}/tracker/claims/${claimUUID}/timeline`);
    }
}
