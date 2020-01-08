import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { DraftMessage } from '@pko/claims/models';

@Component({
    selector: 'pko-message-form',
    templateUrl: './message-form.component.pug',
    styleUrls: ['./message-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageFormComponent implements OnInit {
    @Input() withSubject: boolean;

    @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
    @Output() send: EventEmitter<DraftMessage> = new EventEmitter<DraftMessage>();

    form: FormGroup;

    constructor(private _fb: FormBuilder) { }

    ngOnInit() {
        this.form = this._fb.group({
            body: [ null ]
        });

        if (this.withSubject) {
            this.form.addControl('subject', this._fb.control(null));
        }
    }
}
