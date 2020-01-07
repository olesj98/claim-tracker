import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { User } from '@pko/auth/models';

@Component({
    selector: 'pko-user-menu',
    templateUrl: './user-menu.component.pug',
    styleUrls: [ './user-menu.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMenuComponent {
    @Input() minified: boolean;
    @Input() user: User;
}
