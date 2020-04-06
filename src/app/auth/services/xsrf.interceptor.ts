import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class XsrfInterceptor implements HttpInterceptor {
    constructor(private _xsrfTokenExtractor: HttpXsrfTokenExtractor) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const X_XSRF_TOKEN_NAME = 'X-XSRF-TOKEN';

        if (req.method === 'GET' || req.method === 'HEAD') {
            return next.handle(req);
        }

        const token = this._xsrfTokenExtractor.getToken();

        if (token !== null && !req.headers.has(X_XSRF_TOKEN_NAME)) {
            return next.handle(req.clone({ headers: req.headers.set(X_XSRF_TOKEN_NAME, token) }));
        }

        return next.handle(req);
    }
}
