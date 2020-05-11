import {
    Component,
    ChangeDetectionStrategy,
    Output,
    EventEmitter,
    Input,
    ChangeDetectorRef, OnInit
} from '@angular/core';
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
export class MessageInputComponent implements OnInit {
    @Input() focusMessageInput: boolean;

    @Output() send: EventEmitter<DraftMessage> = new EventEmitter<DraftMessage>();

    message = new FormGroup({
        body: new FormControl(null)
    });

    private _quill: Quill;

    get body(): FormControl {
        return this.message.get('body') as FormControl;
    }

    constructor(private _changeDetectorRef: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.body.valueChanges
            .pipe()
            .subscribe(() => this._changeDetectorRef.markForCheck());
    }

    submit(): void {
        if (!this.isMessageEmpty() && this.isQuillValueOk(2500)) {
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

    isQuillValueOk(maxlength: number): boolean {
        const html = this._quill.container.firstChild.innerHTML;

        if (html.length > maxlength) {
            this.body.setErrors({ messageMaxLength: true });
            this.body.markAsTouched();
            return false;
        }

        return true;
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
