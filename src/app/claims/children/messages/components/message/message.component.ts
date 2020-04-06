import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Message, MessageRecipient } from '@pko/claims/models';

@Component({
    selector: 'pko-message',
    templateUrl: './message.component.pug',
    styleUrls: ['./message.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageComponent {
    @Input() message: Message;
    @Input() squashed: [boolean, boolean, boolean];

    get isSelf(): boolean {
        return this.message.recipient === MessageRecipient.Adjuster;
    }

    get isSquashed(): boolean {
        return this.squashed[0];
    }

    get isBetween(): boolean {
        return this.squashed[1];
    }

    get isLastBeforeSquashed(): boolean {
        return this.squashed[2];
    }
}
