import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { PeselMaskConfig, PhoneNumberMaskConfig } from '@pko/shared/util';
import { peselValidator } from '@pko/shared/controls';
import { HttpError } from '@pko/core';

import { Signup } from '../../models';

@Component({
    selector: 'pko-signup-form',
    templateUrl: './signup-form.component.pug',
    styleUrls: ['./signup-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupFormComponent implements OnInit {
    @Input() error: HttpError;

    @Output() submitted: EventEmitter<Signup> = new EventEmitter<Signup>();

    form: FormGroup;
    phoneNumberMask = new PhoneNumberMaskConfig();
    peselMask = new PeselMaskConfig();

    get phoneNumber(): FormControl {
        return this.form.get('phoneNumber') as FormControl;
    }

    get pesel(): FormControl {
        return this.form.get('pesel') as FormControl;
    }

    constructor(private _fb: FormBuilder) { }

    ngOnInit() {
        this.form = this._fb.group({
            phoneNumber: [null, Validators.required],
            pesel: [null, Validators.compose([
                Validators.required, peselValidator
            ])]
        });
    }

    submit() {
        if (this.form.valid) {
            this.submitted.next(this.form.value);
        }
    }
}
