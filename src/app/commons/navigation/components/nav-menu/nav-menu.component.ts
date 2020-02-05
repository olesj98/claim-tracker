import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'pko-nav-menu',
    templateUrl: './nav-menu.component.pug',
    styleUrls: ['./nav-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavMenuComponent { }
