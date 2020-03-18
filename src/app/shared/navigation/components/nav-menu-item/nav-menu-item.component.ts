import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'pko-nav-menu-item',
    templateUrl: './nav-menu-item.component.pug',
    styleUrls: [ './nav-menu-item.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavMenuItemComponent {
    @Input() path: string;
}
