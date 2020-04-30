import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { hrefGet } from '@pko/core';

import { Claim, ClaimLinkRel, DraftMessage, Message } from '../models';

@Injectable({ providedIn: 'root' })
export class MessagesService {
    constructor(private _http: HttpClient) { }

    getMessages(claim: Claim): Observable<Array<Message>> {
        return this._http.get<Array<Message>>(hrefGet(claim.links, ClaimLinkRel.Messages));
    }

    sendMessage(draftMessage: DraftMessage, claim: Claim): Observable<Message> {
        return this._http.post<Message>(hrefGet(claim.links, ClaimLinkRel.Messages), draftMessage);
    }

    markAllAsRead(claim: Claim, readMessageDate: string): Observable<void> {
        return this._http.post<void>(hrefGet(claim.links, ClaimLinkRel.Self), { readMessageDate });
    }
}
