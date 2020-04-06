import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@pko-env/environment';

import { Claim } from '../models';

@Injectable({ providedIn: 'root' })
export class ClaimsService {
    constructor(private _http: HttpClient) { }

    getClaimsList(): Observable<Array<Claim>> {
        return this._http
            .get<Array<Claim>>(`${environment.api.url}/tracker/claims`);
    }
}
