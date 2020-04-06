import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpError } from '@pko/core';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private _router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse) {
                    const response: HttpError = error.error;

                    if (response?.type !== 'AUTH') {
                        switch (error.status) {
                            case 401: {
                                this._router.navigate(['/login']);
                                break;
                            }
                            default:
                                break;
                        }
                    }
                }

                return throwError(error);
            })
        );
    }
}
