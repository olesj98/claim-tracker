import { Component, ChangeDetectionStrategy, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PinValidator } from '../../validators';
import { SignupPIN } from '../../models';

@Component({
    selector: 'pko-pin-form',
    templateUrl: './pin-form.component.pug',
    styleUrls: [ './pin-form.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PinFormComponent implements OnInit {
    @Output() submitted: EventEmitter<SignupPIN> = new EventEmitter<SignupPIN>();

    form: FormGroup;
    confirmed: boolean;

    constructor(private _fb: FormBuilder) { }

    ngOnInit(): void {
        this.form = this._fb.group({
            pin: [ '', Validators.compose([
                    Validators.required,
                    Validators.minLength(4)
                ])
            ],
            pinConfirm: [ '', Validators.compose([
                    Validators.required,
                    Validators.minLength(4),
                    PinValidator('pin')
                ])
            ]
        });
    }

    confirmPIN(): void {
        if (this.form.get('pin').valid) {
            this.confirmed = true;
        }
    }

    submit(): void {
        if (this.form.valid) {
            this.submitted.emit(this.form.value);
        }
    }
}
