import {
    Component,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    ElementRef,
    NgZone
} from '@angular/core';

import { DraftMessage, Message } from '@pko/claims/models';

@Component({
    selector: 'pko-messenger',
    templateUrl: './messenger.component.pug',
    styleUrls: ['./messenger.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessengerComponent {
    @Input() focusMessageInput: boolean;

    @Input()
    set messages(messages: Array<Message>) {
        this._messages = messages;
        this._scrollToBottom();
    }
    get messages(): Array<Message> {
        return this._messages;
    }

    @Output() sendMessage: EventEmitter<DraftMessage> = new EventEmitter<DraftMessage>();

    @ViewChild('scrollable', { static: true, read: ElementRef }) scrollable: ElementRef;

    private _messages: Array<Message>;

    constructor(private _ngZone: NgZone) { }

    trackByMessage = (index: number, message: Message) => message.postDate;

    private _scrollToBottom(): void {
        if (this.scrollable) {
            this._ngZone.runOutsideAngular(() =>
                Promise.resolve().then(() =>
                    this.scrollable.nativeElement.scrollTop = this.scrollable.nativeElement.scrollHeight
                )
            );
        }
    }
}
