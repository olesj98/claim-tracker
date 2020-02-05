import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Credentials, Signup, SignupPIN, User } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private _http: HttpClient) { }

    signin(credentials: Credentials): Observable<User> {
        return of({
            id: 'jan_kowalski',
            name: 'Jan',
            surname: 'Kowalski'
        });
    }

    verify(data: Signup): Observable<void> {
        return of(null);
    }

    verifySMS(code: string): Observable<void> {
        return of(null);
    }

    resendSMS(): Observable<void> {
        return of(null);
    }

    configurePIN(pin: SignupPIN): Observable<void> {
        return of(null);
    }
}
