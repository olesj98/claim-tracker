import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Claim } from '../models';

@Injectable({ providedIn: 'root' })
export class ClaimsService {
    constructor(private _http: HttpClient) { }

    getClaimsList(): Observable<Array<Claim>> {
        return this._http
            .get<Array<Claim>>(`api/tracker/claims`);
    }
}
