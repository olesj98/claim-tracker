import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorCode } from '@pko/core/error';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  private readonly skippableError = [ErrorCode.AUTH, ErrorCode.ACCOUNT_LOCKED];

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError((err: HttpErrorResponse) => {

          if (!this.skippableError.includes(err?.error?.code)) {
            console.error(`Error on ${req.method} -> ${req.url}: `, err?.error);
          }

          return throwError(err);
        })
      );
  }
}
