import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import * as Quill from 'quill';

import { DraftMessage } from '@pko/claims/models';

replaceTags();

@Component({
    selector: 'pko-message-input',
    templateUrl: './message-input.component.pug',
    styleUrls: ['./message-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageInputComponent {
    @Input() focusMessageInput: boolean;

    @Output() send: EventEmitter<DraftMessage> = new EventEmitter<DraftMessage>();

    message = new FormGroup({
        body: new FormControl(null)
    });

    private _quill: Quill;

    submit(): void {
        if (!this.isMessageEmpty()) {
            this.send.emit(this.message.value);
            this.message.reset();
        }
    }

    onQuillCreated(quill: Quill): void {
        this._quill = quill;

        if (this.focusMessageInput) {
            this._quill.focus();
        }
    }

    isMessageEmpty(): boolean {
        return this._quill && !this._quill.getText().trim().length;
    }
}

function replaceTags() {
    const bold = Quill.import('formats/bold');
    const italic = Quill.import('formats/italic');

    bold.tagName = 'b';
    Quill.register(bold, true);

    italic.tagName = 'i';
    Quill.register(italic, true);
}
