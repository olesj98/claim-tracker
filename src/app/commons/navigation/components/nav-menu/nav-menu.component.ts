import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { MenuTab } from '../../models';

@Component({
    selector: 'pko-nav-menu',
    templateUrl: './nav-menu.component.pug',
    styleUrls: ['./nav-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavMenuComponent {
    @Input() tabs: Array<MenuTab>;
}
