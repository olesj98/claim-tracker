import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Message } from '@pko/claims/models';

@Component({
    selector: 'pko-message',
    templateUrl: './message.component.pug',
    styleUrls: ['./message.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageComponent {
    @Input() message: Message;
    @Input() mayReply: boolean;

    messageFormShowing: boolean;
}
