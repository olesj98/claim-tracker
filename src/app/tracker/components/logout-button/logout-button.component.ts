import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'pko-logout-button',
    templateUrl: './logout-button.component.pug',
    styleUrls: ['./logout-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoutButtonComponent {
    @Input()
    set minified(minified: boolean) {
        this._minified = minified;
        this.menuShowing = false;
    }
    get minified(): boolean {
        return this._minified;
    }

    @Output() confirm: EventEmitter<void> = new EventEmitter<void>();

    menuShowing: boolean;

    private _minified: boolean;

    constructor(private _changeDetectorRef: ChangeDetectorRef) { }

    closeMenu(): void {
        this.menuShowing = false;
        this._changeDetectorRef.markForCheck();
    }

    onLogout(): void {
        if (this.minified) {
            this.menuShowing = true;
        } else {
            this.confirm.emit();
        }
    }
}
