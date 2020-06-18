import { AfterViewInit, Directive, ElementRef, OnDestroy } from '@angular/core';

import * as Stickyfill from 'stickyfilljs';

@Directive({ selector: '[sticky]' })
export class StickyDirective implements AfterViewInit, OnDestroy {
    constructor(private _elementRef: ElementRef) { }

    ngAfterViewInit(): void {
        Stickyfill.addOne(this._elementRef.nativeElement);
    }

    ngOnDestroy(): void {
        Stickyfill.removeOne(this._elementRef.nativeElement);
    }
}
