import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { HttpError } from '@pko/core';
import { PhoneNumberMaskConfig } from '@pko/shared/util';

import { Credentials } from '../../models';

@Component({
    selector: 'pko-login-form',
    templateUrl: './login-form.component.pug',
    styleUrls: ['./login-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent implements OnInit, OnDestroy {
    @Input()
    set error(error: HttpError | null) {
        this._error = error;

        if (this._error && this.form) {
            this.resetControls();
        }
    }
    get error(): HttpError | null {
        return this._error;
    }

    @Output() submitted: EventEmitter<Credentials> = new EventEmitter<Credentials>();
    @Output() flush: EventEmitter<void> = new EventEmitter<void>();

    form: FormGroup;
    phoneVerified: boolean;

    phoneNumberMask = new PhoneNumberMaskConfig();

    private _phoneValueChangeSubscription: Subscription;
    private _error: HttpError;

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

        this._phoneValueChangeSubscription = this.phoneNumber.valueChanges
            .pipe(filter(() => !!this.error))
            .subscribe(() => this.flush.emit());
    }

    ngOnDestroy(): void {
        this._phoneValueChangeSubscription.unsubscribe();
    }

    restore() {
        this.flush.emit();
        this.resetControls();
    }

    resetControls(): void {
        this.form.reset(undefined, { emitEvent: false });
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
