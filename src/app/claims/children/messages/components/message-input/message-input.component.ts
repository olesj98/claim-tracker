import { Component, ChangeDetectionStrategy, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { DraftMessage } from '@pko/claims/models';

@Component({
    selector: 'pko-message-input',
    templateUrl: './message-input.component.pug',
    styleUrls: ['./message-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageInputComponent implements AfterViewInit {
    @ViewChild('inputRef', { static: true, read: ElementRef }) inputRef: ElementRef;

    @Output() send: EventEmitter<DraftMessage> = new EventEmitter<DraftMessage>();

    message = new FormGroup({
        body: new FormControl(null)
    });

    ngAfterViewInit(): void {
        this.inputRef.nativeElement.focus();
    }

    submit(): void {
        if (this.message.get('body').value) {
            this.send.emit(this.message.value);
            this.message.reset();
        }
    }
}
