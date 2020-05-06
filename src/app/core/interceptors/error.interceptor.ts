import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, exhaustMap, pluck, withLatestFrom } from 'rxjs/operators';

import { DialogRef, DialogService } from '@pko/shared/dialog';
import { BottomSheetRef, BottomSheetService } from '@pko/shared/bottom-sheet';

import { ErrorDialogComponent } from '../components/error-dialog/error-dialog.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    private _dialogOrBottomSheetTrigger$: Subject<void> = new Subject<void>();

    constructor(
        private _observer: BreakpointObserver,
        private _dialog: DialogService,
        private _bottomSheet: BottomSheetService) {

        this._dialogOrBottomSheetTrigger$.pipe(
            withLatestFrom(this._observer.observe('(max-width: 991px)').pipe(pluck('matches'))),
            exhaustMap(([_, isTablerOrSmallerDevice]) =>
                this._openDialogOrBottomSheetAndWaitToClose(isTablerOrSmallerDevice)
            )
        )
            .subscribe();
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse) {
                    switch (error.status) {
                        case 500: {
                            Promise.resolve().then(() =>
                                this._dialogOrBottomSheetTrigger$.next());
                            break;
                        }
                        default: {
                            break;
                        }
                    }
                }

                return throwError(error);
            })
        );
    }

    private _openDialogOrBottomSheetAndWaitToClose(isSmallDevice: boolean): Observable<any> {
        const dialogOrBottomSheetRef = this._openDialogOrBottomSheet(isSmallDevice);

        if (dialogOrBottomSheetRef instanceof DialogRef) {
            return dialogOrBottomSheetRef.afterClosed();
        } else if (dialogOrBottomSheetRef instanceof BottomSheetRef) {
            return dialogOrBottomSheetRef.afterDismissed();
        }
    }

    private _openDialogOrBottomSheet(isSmallDevice: boolean): DialogRef<ErrorDialogComponent> | BottomSheetRef<ErrorDialogComponent> {
        if (isSmallDevice) {
            return this._bottomSheet.open(ErrorDialogComponent);
        }
        return this._dialog.open(ErrorDialogComponent, {
            width: '600px'
        });
    }
}
