import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@pko-env/environment';

import { DraftMessage, Message } from '../models';

@Injectable({ providedIn: 'root' })
export class MessagesService {
    constructor(private _http: HttpClient) { }

    getMessages(claimUUID: string): Observable<Array<Message>> {
        return this._http
            .get<Array<Message>>(`${environment.api.url}/tracker/claims/${claimUUID}/messages`);
    }

    sendMessage(draftMessage: DraftMessage, claimUUID: string): Observable<any> {
        return this._http
            .post<any>(`${environment.api.url}/tracker/claims/${claimUUID}/messages`, draftMessage);
    }
}
