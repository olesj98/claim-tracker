import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { User } from '@pko/auth/models';
import { toolbarAnimation } from './toolbar.animations';

@Component({
    selector: 'pko-toolbar',
    templateUrl: './toolbar.component.pug',
    styleUrls: [ './toolbar.component.scss' ],
    animations: [ toolbarAnimation ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
    @Input() minified: boolean;
    @Input() user: User;

    @Output() logout: EventEmitter<void> = new EventEmitter<void>();
}
