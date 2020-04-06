import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '@pko-env/environment';
import { Credentials, Signup, SignupPin, SmsVerification, User } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private _http: HttpClient) { }

    signin(credentials: Credentials): Observable<void> {
        const formData = new FormData();
        formData.append('phoneNumber', credentials.phoneNumber);
        formData.append('pin', credentials.pin);

        return this._http
            .post<void>(`${environment.api.url}/tracker/login`, formData);
    }

    quit(): Observable<void> {
        return this._http
            .post<void>(`${environment.api.url}/tracker/logout`, null);
    }

    verify(signup: Signup): Observable<void> {
        const formData = new FormData();
        formData.append('phoneNumber', signup.phoneNumber);
        formData.append('pesel', signup.pesel);

        return this._http
            .post<void>(`${environment.api.url}/registration/login`, formData);
    }

    verifySMS(smsVerification: SmsVerification): Observable<void> {
        return this._http
            .post<void>(`${environment.api.url}/registration/enter_code`, smsVerification);
    }

    resendSMS(): Observable<void> {
        return this._http
            .post<void>(`${environment.api.url}/registration/send_new_code`, null);
    }

    configurePIN(signupPin: SignupPin): Observable<void> {
        return this._http
            .post<void>(`${environment.api.url}/registration/assign_pin`, signupPin);
    }

    getAuthorizedUser(): Observable<User> {
        return this._http
            .get<User>(`${environment.api.url}/tracker/logged_user`);
    }
}
