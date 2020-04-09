import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Credentials, Signup, SignupPin, SmsVerification, User } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private _http: HttpClient) { }

    signin(credentials: Credentials): Observable<void> {
        const formData = new FormData();
        formData.append('phoneNumber', credentials.phoneNumber);
        formData.append('pin', credentials.pin);

        return this._http
            .post<void>(`api/tracker/login`, formData);
    }

    quit(): Observable<void> {
        return this._http
            .post<void>(`api/tracker/logout`, null);
    }

    verify(signup: Signup): Observable<void> {
        const formData = new FormData();
        formData.append('phoneNumber', signup.phoneNumber);
        formData.append('pesel', signup.pesel);

        return this._http
            .post<void>(`api/registration/login`, formData);
    }

    verifySMS(smsVerification: SmsVerification): Observable<void> {
        return this._http
            .post<void>(`api/registration/enter_code`, smsVerification);
    }

    resendSMS(): Observable<void> {
        return this._http
            .post<void>(`api/registration/send_new_code`, null);
    }

    configurePIN(signupPin: SignupPin): Observable<void> {
        return this._http
            .post<void>(`api/registration/assign_pin`, signupPin);
    }

    getAuthorizedUser(): Observable<User> {
        return this._http
            .get<User>(`api/tracker/logged_user`);
    }
}
