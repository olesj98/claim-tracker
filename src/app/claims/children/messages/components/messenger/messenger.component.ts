import {
    Component,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    ElementRef,
    NgZone,
    AfterViewInit
} from '@angular/core';

import { DraftMessage, Message } from '@pko/claims/models';

@Component({
    selector: 'pko-messenger',
    templateUrl: './messenger.component.pug',
    styleUrls: ['./messenger.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessengerComponent implements AfterViewInit {
    @Input() focusMessageInput: boolean;
    @Input() scrollToBottom: boolean;

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
    @ViewChild('messenger', { static: true, read: ElementRef }) messenger: ElementRef;

    private _messages: Array<Message>;

    constructor(private _ngZone: NgZone) { }

    trackByMessage = (index: number, message: Message) => message.postDate;

    ngAfterViewInit(): void {
        if (this.scrollToBottom) {
            this._ngZone.runOutsideAngular(() =>
                Promise.resolve().then(() =>
                    this.messenger.nativeElement.scrollIntoView({
                        block: 'end'
                    })
                )
            );
        }
    }

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
