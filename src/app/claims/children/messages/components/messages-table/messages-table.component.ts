import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Thread } from '@pko/claims/models';
import { User } from '@pko/auth/models';

@Component({
    selector: 'pko-messages-table',
    templateUrl: './messages-table.component.pug',
    styleUrls: ['./messages-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesTableComponent {
    @Input() threads: Array<Thread>;
    @Input() user: User;

    trackByThreadId = (index: number, thread: Thread) => thread.id;
}
