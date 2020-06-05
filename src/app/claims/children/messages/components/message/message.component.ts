import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Message, MessageRecipient } from '@pko/claims/models';

import { MessageConfig } from '../../klasses';

@Component({
    selector: 'pko-message',
    templateUrl: './message.component.pug',
    styleUrls: ['./message.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageComponent {
    @Input() message: Message;
    @Input() config: MessageConfig;

    get isSelf(): boolean {
        return this.message.recipient === MessageRecipient.Adjuster;
    }
}
