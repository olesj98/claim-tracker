import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { DraftMessage } from '@pko/claims/models';

@Component({
    selector: 'pko-message-input',
    templateUrl: './message-input.component.pug',
    styleUrls: ['./message-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageInputComponent {
    @Output() send: EventEmitter<DraftMessage> = new EventEmitter<DraftMessage>();

    message = new FormGroup({
        body: new FormControl(null)
    });

    submit(): void {
        if (this.message.get('body').value) {
            this.send.emit(this.message.value);
            this.message.reset();
        }
    }
}
