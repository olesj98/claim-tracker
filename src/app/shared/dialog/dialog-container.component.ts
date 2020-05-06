import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, ComponentRef,
    ElementRef, EmbeddedViewRef,
    EventEmitter, HostBinding, HostListener, Inject, Optional,
    ViewChild
} from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { BasePortalOutlet, CdkPortalOutlet, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';

import { DialogConfig } from './dialog-config';
import { dialogAnimations } from './dialog-animations';

@Component({
    selector: 'pko-dialog-container',
    templateUrl: './dialog-container.component.pug',
    styleUrls: ['./dialog-container.component.scss'],
    animations: [ dialogAnimations ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogContainerComponent extends BasePortalOutlet {
    @ViewChild(CdkPortalOutlet, { static: true }) portalOutlet: CdkPortalOutlet;

    @HostBinding('@dialogContainer') state: 'void' | 'enter' | 'exit' = 'enter';
    @HostBinding('class.dialog-container') hostClass = true;

    animationStateChanged: EventEmitter<AnimationEvent> = new EventEmitter<AnimationEvent>();

    private _document: any;

    constructor(
        private _elementRef: ElementRef,
        private _changeDetectorRef: ChangeDetectorRef,
        @Optional() @Inject(DOCUMENT) _document: any,
        public config: DialogConfig<any>) {

        super();

        this._document = _document;
    }

    attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
        if (!this.portalOutlet.hasAttached()) {
            return this.portalOutlet.attachComponentPortal(portal);
        }
    }

    attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
        return;
    }

    @HostListener('@dialogContainer.done', ['$event'])
    @HostListener('@dialogContainer.start', ['$event']) onAnimationEvent(event: AnimationEvent) {
        this.animationStateChanged.emit(event);
    }

    startExitAnimation(): void {
        this.state = 'exit';
        this._changeDetectorRef.markForCheck();
    }
}
