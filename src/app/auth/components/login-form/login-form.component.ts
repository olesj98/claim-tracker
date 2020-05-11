import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { HttpError } from '@pko/core';
import { PhoneNumberMaskConfig } from '@pko/shared/util';

import { Credentials } from '../../models';

@Component({
    selector: 'pko-login-form',
    templateUrl: './login-form.component.pug',
    styleUrls: ['./login-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent implements OnInit {
    @Input() error: HttpError | null;

    @Output() submitted: EventEmitter<Credentials> = new EventEmitter<Credentials>();
    @Output() flush: EventEmitter<void> = new EventEmitter<void>();

    form: FormGroup;
    phoneVerified: boolean;

    phoneNumberMask = new PhoneNumberMaskConfig();

    get phoneNumber(): FormControl {
        return this.form.get('phoneNumber') as FormControl;
    }

    get pin(): FormControl {
        return this.form.get('pin') as FormControl;
    }

    constructor(private _fb: FormBuilder) { }

    ngOnInit() {
        this.form = this._fb.group({
            phoneNumber: [null, Validators.compose([
                Validators.required,
                Validators.minLength(9)
            ])],
            pin: [null, Validators.required]
        });
    }

    restore() {
        this.flush.emit();
        this.form.reset();
        this.phoneVerified = false;
    }

    verifyPhone() {
        this.phoneNumber.markAsTouched();

        if (this.phoneNumber.valid) {
            this.phoneVerified = true;
        }
    }

    submit() {
        if (this.form.valid) {
            this.submitted.emit(this.form.value);
        }
    }
}
