import { Injectable, InjectionToken, Injector, OnDestroy, Optional, SkipSelf, StaticProvider } from '@angular/core';
import { ComponentType, Overlay, OverlayConfig, OverlayContainer, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Subject } from 'rxjs';

import { DialogRef } from './dialog-ref';
import { DialogConfig } from './dialog-config';
import { DialogContainerComponent } from './dialog-container.component';

export const DIALOG_DATA = new InjectionToken<any>('dialog.data');

@Injectable()
export class DialogService implements OnDestroy {
    private _openDialogsAtThisLevel: DialogRef<any>[] = [];

    private readonly _afterAllClosedAtThisLevel: Subject<void> = new Subject<void>();
    private readonly _afterOpenedAtThisLevel: Subject<DialogRef<any>> = new Subject<DialogRef<any>>();

    get openDialogs(): DialogRef<any>[] {
        return this._parentDialog ?
            this._parentDialog.openDialogs : this._openDialogsAtThisLevel;
    }

    get afterOpened(): Subject<DialogRef<any>> {
        return this._parentDialog ?
            this._parentDialog.afterOpened : this._afterOpenedAtThisLevel;
    }

    get _afterAllClosed(): Subject<void> {
        const parent = this._parentDialog;
        return parent ?
            parent._afterAllClosed : this._afterAllClosedAtThisLevel;
    }

    constructor(
        private _overlay: Overlay,
        private _injector: Injector,
        private _overlayContainer: OverlayContainer,
        @Optional() @SkipSelf() private _parentDialog: DialogService) {
    }

    open<T, D = any, R = any>(componentRef: ComponentType<T>, config?: DialogConfig<D>): DialogRef<T, R> {
        config = { ...config, ...new DialogConfig() };

        const overlayRef = this._createOverlay(config);
        const dialogContainer = this._attachDialogContainer(overlayRef, config);
        const dialogRef = this._attachDialogContent<T, R>(componentRef, dialogContainer, overlayRef, config);

        this.openDialogs.push(dialogRef);
        dialogRef.afterClosed().subscribe(() => this._removeOpenDialog(dialogRef));
        this.afterOpened.next(dialogRef);

        return dialogRef;
    }

    ngOnDestroy(): void {
        this._closeDialogs(this._openDialogsAtThisLevel);
    }

    closeAll(): void {
        this._closeDialogs(this.openDialogs);
    }

    private _createOverlay(config: DialogConfig): OverlayRef {
        const overlayConfig = this._getOverlayConfig(config);
        return this._overlay.create(overlayConfig);
    }

    private _getOverlayConfig(config: DialogConfig): OverlayConfig {
        return new OverlayConfig({
            positionStrategy: this._overlay
                .position()
                .global()
                .centerHorizontally()
                .centerVertically(),
            scrollStrategy: this._overlay.scrollStrategies
                .block(),
            panelClass: config.panelClass,
            hasBackdrop: config.hasBackdrop,
            minWidth: config.minWidth,
            minHeight: config.minHeight,
            maxWidth: config.maxWidth,
            maxHeight: config.maxHeight,
            width: config.width,
            height: config.height,
            disposeOnNavigation: config.closeOnNavigation,
            backdropClass: config.backdropClass
        });
    }

    private _attachDialogContainer(overlay: OverlayRef, config: DialogConfig): DialogContainerComponent {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        const injector = Injector.create({
            parent: userInjector || this._injector,
            providers: [{ provide: DialogConfig, useValue: config }]
        });

        const containerPortal = new ComponentPortal(DialogContainerComponent, config.viewContainerRef, injector);
        const containerRef = overlay.attach<DialogContainerComponent>(containerPortal);

        return containerRef.instance;
    }

    private _attachDialogContent<T, R>(
        componentRef: ComponentType<T>,
        dialogContainer: DialogContainerComponent,
        overlayRef: OverlayRef,
        config: DialogConfig): DialogRef<T, R> {

        const dialogRef = new DialogRef<T, R>(overlayRef, dialogContainer);

        const injector = this._createInjector<T>(config, dialogRef, dialogContainer);
        const contentRef = dialogContainer.attachComponentPortal<T>(
            new ComponentPortal(componentRef, config.viewContainerRef, injector));
        dialogRef.instance = contentRef.instance;

        dialogRef

        return dialogRef;
    }

    private _createInjector<T>(config: DialogConfig, dialogRef: DialogRef<T>, dialogContainer: DialogContainerComponent): Injector {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;

        const providers: StaticProvider[] = [
            { provide: DialogContainerComponent, useValue: dialogContainer },
            { provide: DIALOG_DATA, useValue: config.data },
            { provide: DialogRef, useValue: dialogRef }
        ];

        return Injector.create({ parent: userInjector || this._injector, providers });
    }

    private _removeOpenDialog(dialogRef: DialogRef<any>) {
        const index = this.openDialogs.indexOf(dialogRef);

        if (index > -1) {
            this.openDialogs.splice(index, 1);

            if (!this.openDialogs.length) {
                this._afterAllClosed.next();
            }
        }
    }

    private _closeDialogs(dialogs: DialogRef<any>[]) {
        let i = dialogs.length;

        while (i--) {
            dialogs[i].close();
        }
    }
}
