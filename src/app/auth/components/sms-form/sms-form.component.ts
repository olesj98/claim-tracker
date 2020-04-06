import { Component, ChangeDetectionStrategy, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpError } from '@pko/core';

import { SmsVerification } from '../../models';

@Component({
    selector: 'pko-sms-form',
    templateUrl: './sms-form.component.pug',
    styleUrls: ['./sms-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SMSFormComponent implements OnInit {
    @Input() error: HttpError;

    @Output() submitted: EventEmitter<SmsVerification> = new EventEmitter<SmsVerification>();
    @Output() resend: EventEmitter<void> = new EventEmitter<void>();

    form: FormGroup;

    constructor(private _fb: FormBuilder) { }

    ngOnInit(): void {
        this.form = this._fb.group({
            code: ['', Validators.compose([
                Validators.required
            ])]
        });
    }

    submit() {
        if (this.form.valid) {
            this.submitted.emit(this.form.value);
        }
    }
}
