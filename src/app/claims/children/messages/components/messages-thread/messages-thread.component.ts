import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Thread } from '@pko/claims/models';
import { User } from '@pko/auth/models';

@Component({
    selector: 'pko-messages-thread',
    templateUrl: './messages-thread.component.pug',
    styleUrls: ['./messages-thread.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesThreadComponent {
    @Input() thread: Thread;
    @Input() user: User;

    collapsed = true;
    trackByMessage = (index: number) => index;
}
