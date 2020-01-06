import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    ComponentRef,
    EmbeddedViewRef,
    EventEmitter, HostBinding, HostListener,
    OnDestroy,
    ViewChild
} from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { BasePortalOutlet, CdkPortalOutlet, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';

import { BottomSheetConfig } from './bottom-sheet-config';
import { bottomSheetAnimation } from './bottom-sheet-animation';

@Component({
    selector: 'pko-bottom-sheet-container',
    templateUrl: './bottom-sheet-container.component.pug',
    animations: [
        bottomSheetAnimation
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BottomSheetContainerComponent extends BasePortalOutlet implements OnDestroy {
    @ViewChild(CdkPortalOutlet, { static: true }) portalOutlet: CdkPortalOutlet;
    @HostBinding('@state') animationState: 'void' | 'visible' | 'hidden' = 'void';
    @HostBinding('class.bottom-sheet-container') panelClass = true;

    animationStateChanged: EventEmitter<AnimationEvent> = new EventEmitter<AnimationEvent>();

    private _destroyed: boolean;

    constructor(
        public bottomSheetConfig: BottomSheetConfig,
        private _changeDetectorRef: ChangeDetectorRef) {
        super();
    }

    @HostListener('@state.done', ['$event']) onAnimationDone(event: AnimationEvent) {
        this.animationStateChanged.emit(event);
    }

    @HostListener('@state.start', ['$event']) onAnimationStart(event: AnimationEvent) {
        this.animationStateChanged.emit(event);
    }

    attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
        this._validatePortalAttached();
        return this.portalOutlet.attachComponentPortal(portal);
    }

    attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
        this._validatePortalAttached();
        return this.portalOutlet.attachTemplatePortal(portal);
    }

    enter(): void {
        if (!this._destroyed) {
            this.animationState = 'visible';
            this._changeDetectorRef.detectChanges();
        }
    }

    exit(): void {
        if (!this._destroyed) {
            this.animationState = 'hidden';
            this._changeDetectorRef.markForCheck();
        }
    }

    private _validatePortalAttached() {
        if (this.portalOutlet.hasAttached()) {
            throw Error('Attempting to attach bottom sheet content after content is already attached');
        }
    }

    ngOnDestroy(): void {

    }
}

