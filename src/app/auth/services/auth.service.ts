import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Credentials, Signup, User } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private _http: HttpClient) { }

    signin(credentials: Credentials): Observable<User> {
        return of({
            name: 'Kamil',
            surname: 'Kwasiborski'
        });
    }

    signup(data: Signup): Observable<void> {
        return of(null);
    }
}
