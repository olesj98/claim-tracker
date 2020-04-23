import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';

import { User } from '@pko/auth';

import { userMenuAnimation } from './user-menu.animations';

@Component({
    selector: 'pko-user-menu',
    templateUrl: './user-menu.component.pug',
    styleUrls: [ './user-menu.component.scss' ],
    animations: [ userMenuAnimation.tooltip ],
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
        this.tooltipShowing = true;
        this._changeDetectorRef.markForCheck();
    }

    closeContextTip(): void {
        this.tooltipShowing = false;
        this._changeDetectorRef.markForCheck();
    }
}
