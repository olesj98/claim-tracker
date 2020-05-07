import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DocumentReaderService {
    constructor(private _http: HttpClient) { }

    read(url: string): Observable<Blob> {
        return this._http.get<Blob>(url, { responseType: 'blob' as any });
    }
}
