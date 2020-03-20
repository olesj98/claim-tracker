import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';

import { Credentials, Signup, SignupPIN, SmsVerification, User } from '../models';

@Injectable()
export class AuthService {

    private readonly accountsUri = '/api/accounts';

    constructor(private _http: HttpClient) { }

    signin(credentials: Credentials): Observable<User> {
        return of({
            id: 'jan_kowalski',
            name: 'Jan',
            surname: 'Kowalski'
        });
    }

    verify(data: Signup): Observable<void> {
        return this._http.post<void>(`${this.accountsUri}/register`, data)
            .pipe(first());
    }

    verifySMS(data: SmsVerification): Observable<void> {
        return this._http.post<void>(`${this.accountsUri}/pin`, data)
          .pipe(first());
    }

    resendSMS(): Observable<void> {
        return of(null);
    }

    configurePIN(pin: SignupPIN): Observable<void> {
        return of(null);
    }
}
