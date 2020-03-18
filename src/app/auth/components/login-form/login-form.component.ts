import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Credentials } from '../../models';

@Component({
    selector: 'pko-login-form',
    templateUrl: './login-form.component.pug',
    styleUrls: ['./login-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent implements OnInit {
    @Output() submitted: EventEmitter<Credentials> = new EventEmitter<Credentials>();

    form: FormGroup;
    phoneVerified: boolean;

    constructor(private _fb: FormBuilder) { }

    ngOnInit() {
        this.form = this._fb.group({
            phone: [null, Validators.required],
            pin: [null, Validators.required]
        });
    }

    restore() {
        this.form.reset();
        this.phoneVerified = false;
    }

    verifyPhone() {
        const phone = this.form.get('phone');
        phone.markAsTouched();

        if (phone.valid) {
            this.phoneVerified = true;
        }
    }

    submit() {
        this.form.get('pin').markAsTouched();

        if (this.form.valid) {
            this.submitted.emit(this.form.value);
        }
    }
}
