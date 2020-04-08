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
            .get<Array<Message>>(`api/tracker/claims/${claimUUID}/messages`);
    }

    sendMessage(draftMessage: DraftMessage, claimUUID: string): Observable<Message> {
        return this._http
            .post<Message>(`api/tracker/claims/${claimUUID}/messages`, draftMessage);
    }

    markAllAsRead(claimUUID: string): Observable<void> {
        const body = {
            readMessageDate: new Date().toISOString()
        };

        return this._http
            .post<void>(`api/tracker/claims/${claimUUID}`, body);
    }
}
