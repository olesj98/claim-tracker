import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';

import { User } from '@pko/auth';

@Component({
    selector: 'pko-user-menu',
    templateUrl: './user-menu.component.pug',
    styleUrls: [ './user-menu.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMenuComponent {
    @Input() user: User;
    @Input()
    set minified(minified: boolean) {
        this._minified = minified;
        this.tooltipShowing = false;
    }
    get minified(): boolean {
        return this._minified;
    }

    tooltipShowing: boolean;

    private _minified: boolean;

    constructor(private _changeDetectorRef: ChangeDetectorRef) { }

    openContextTip(): void {
        if (this.minified) {
            this.tooltipShowing = true;
            this._changeDetectorRef.markForCheck();
        }
    }

    closeContextTip(): void {
        this.tooltipShowing = false;
        this._changeDetectorRef.markForCheck();
    }
}
