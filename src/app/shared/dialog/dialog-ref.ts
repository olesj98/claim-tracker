import { GlobalPositionStrategy, OverlayRef } from '@angular/cdk/overlay';
import { ESCAPE, hasModifierKey } from '@angular/cdk/keycodes';
import { Observable, Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { DialogContainerComponent } from './dialog-container.component';

export enum DialogState { OPEN, CLOSING, CLOSED}

export class DialogRef<T, R = any> {
    instance: T;
    disableClose: boolean | undefined = this.parent.config.disableClose;

    private readonly _afterOpened: Subject<void> = new Subject<void>();
    private readonly _afterClosed: Subject<R | undefined> = new Subject<R | undefined>();
    private readonly _beforeClosed: Subject<R | undefined> = new Subject<R | undefined>();

    private _result: R | undefined;
    private _state = DialogState.OPEN;

    constructor(
        private _overlayRef: OverlayRef,
        public parent: DialogContainerComponent) {

        parent.animationStateChanged.pipe(
            filter(event => event.phaseName === 'done' && event.toState === 'enter'),
            take(1)
        )
            .subscribe(() => {
                this._afterOpened.next();
                this._afterOpened.complete();
            });

        parent.animationStateChanged.pipe(
            filter(event => event.phaseName === 'done' && event.toState === 'exit'),
            take(1)
        ).subscribe(() => this._finishDialogClose());

        _overlayRef.detachments().subscribe(() => {
            this._beforeClosed.next(this._result);
            this._beforeClosed.complete();
            this._afterClosed.next(this._result);
            this._afterClosed.complete();
            this.instance = null;
            this._overlayRef.dispose();
        });

        _overlayRef.keydownEvents()
            .pipe(filter(event => event.keyCode === ESCAPE && !this.disableClose && !hasModifierKey(event)))
            .subscribe(event => {
                event.preventDefault();
                this.close();
            });

        _overlayRef.backdropClick().subscribe(() => {
            if (!this.disableClose) {
                this.close();
            }
        });
    }

    close(dialogResult?: R): void {
        this._result = dialogResult;

        this.parent.animationStateChanged.pipe(
            filter(event => event.phaseName === 'start'),
            take(1)
        )
            .subscribe(() => {
                this._beforeClosed.next(dialogResult);
                this._beforeClosed.complete();
                this._overlayRef.detachBackdrop();
            });

        this.parent.startExitAnimation();
        this._state = DialogState.CLOSING;
    }

    afterOpened(): Observable<void> {
        return this._afterOpened.asObservable();
    }

    afterClosed(): Observable<R | undefined> {
        return this._afterClosed.asObservable();
    }

    beforeClosed(): Observable<R | undefined> {
        return this._beforeClosed.asObservable();
    }

    backdropClick(): Observable<MouseEvent> {
        return this._overlayRef.backdropClick();
    }

    keydownEvents(): Observable<KeyboardEvent> {
        return this._overlayRef.keydownEvents();
    }

    addPanelClass(classes: string | string[]): this {
        this._overlayRef.addPanelClass(classes);
        return this;
    }

    removePanelClass(classes: string | string[]): this {
        this._overlayRef.removePanelClass(classes);
        return this;
    }

    getState(): DialogState {
        return this._state;
    }

    private _finishDialogClose() {
        this._state = DialogState.CLOSED;
        this._overlayRef.dispose();
    }

    private _getPositionStrategy(): GlobalPositionStrategy {
        return this._overlayRef.getConfig().positionStrategy as GlobalPositionStrategy;
    }
}
