import { Component, ChangeDetectionStrategy, Input, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FocusMonitor } from '@angular/cdk/a11y';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'pko-pin-cell',
    templateUrl: './pin-cell.component.pug',
    styleUrls: [ './pin-cell.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PinCellComponent implements OnInit, OnDestroy {
    @Input() control: FormControl;

    mask = [/\d/];

    private get _target(): HTMLInputElement {
        return this._elementRef.nativeElement.querySelector('input.pin-cell');
    }

    constructor(
        private _elementRef: ElementRef,
        private _focusMonitor: FocusMonitor) {
    }

    ngOnInit(): void {
        this._focusMonitor.monitor(this._target)
            .pipe(filter(isFocused => !!isFocused))
            .subscribe(() => this._target.select());
    }

    focus(): void {
        this._focusMonitor.focusVia(this._target, 'program');
    }

    ngOnDestroy(): void {
        this._focusMonitor.stopMonitoring(this._target);
    }
}
