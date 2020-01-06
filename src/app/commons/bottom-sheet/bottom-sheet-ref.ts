import { OverlayRef } from '@angular/cdk/overlay';
import { ESCAPE, hasModifierKey } from '@angular/cdk/keycodes';
import { merge, Observable, Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { BottomSheetContainerComponent } from './bottom-sheet-container.component';

export class BottomSheetRef<T = any, R = any> {
    instance: T;
    container: BottomSheetContainerComponent;
    disableClose: boolean;

    private readonly _afterDismissed: Subject<R | undefined> = new Subject<R | undefined>();
    private readonly _afterOpened: Subject<void> = new Subject<void>();

    private _result: R | undefined;

    constructor(
        container: BottomSheetContainerComponent,
        private _overlayRef: OverlayRef) {
        this.container = container;
        this.disableClose = container.bottomSheetConfig.disableClose;

        container.animationStateChanged.pipe(
            filter(event => event.phaseName === 'done' && event.toState === 'visible'),
            take(1)
        )
            .subscribe(() => {
                this._afterOpened.next();
                this._afterOpened.complete();
            });

        container.animationStateChanged
            .pipe(filter(event => event.phaseName === 'done' && event.toState === 'hidden'), take(1))
            .subscribe(() => _overlayRef.dispose());

        _overlayRef.detachments().pipe(take(1)).subscribe(() => {
            this._afterDismissed.next(this._result);
            this._afterDismissed.complete();
        });

        merge(
            _overlayRef.backdropClick(),
            _overlayRef.keydownEvents().pipe(filter(event => event.keyCode === ESCAPE))
        ).subscribe(event => {
            if (!this.disableClose &&
                (event.type !== 'keydown' || !hasModifierKey(event as KeyboardEvent))) {
                event.preventDefault();
                this.dismiss();
            }
        });
    }

    dismiss(result?: R): void {
        if (!this._afterDismissed.closed) {
            this.container.animationStateChanged.pipe(
                filter(event => event.phaseName === 'start'),
                take(1)
            )
                .subscribe(() => this._overlayRef.detachBackdrop());

            this._result = result;
            this.container.exit();
        }
    }

    afterDismissed(): Observable<R | undefined> {
        return this._afterDismissed.asObservable();
    }

    afterOpened(): Observable<void> {
        return this._afterOpened.asObservable();
    }

    backdropClick(): Observable<MouseEvent> {
        return this._overlayRef.backdropClick();
    }
}
