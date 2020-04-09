import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ClaimDocumentTypesDictionaryService {
    private _documentTypes$: Observable<Array<string>>;

    constructor(private _http: HttpClient) { }

    getDocumentTypes(): Observable<Array<string>> {
        if (!this._documentTypes$) {
            this._documentTypes$ = this._requestDocumentTypes()
                .pipe(shareReplay(1));
        }

        return this._documentTypes$;
    }

    private _requestDocumentTypes(): Observable<Array<string>> {
        return this._http.get<Array<string>>('api/tracker/document-types');
    }
}
