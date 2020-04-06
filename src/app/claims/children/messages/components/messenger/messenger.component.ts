import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { DraftMessage, Message } from '@pko/claims/models';

@Component({
    selector: 'pko-messenger',
    templateUrl: './messenger.component.pug',
    styleUrls: ['./messenger.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessengerComponent {
    @Input() messages: Array<Message>;

    @Output() sendMessage: EventEmitter<DraftMessage> = new EventEmitter<DraftMessage>();

    trackByMessage = (index: number, message: Message) => message.postDate;
}
