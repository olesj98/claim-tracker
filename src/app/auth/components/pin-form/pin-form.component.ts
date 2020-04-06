import { Component, ChangeDetectionStrategy, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { pinValidator } from '@pko/shared/controls';

import { SignupPin } from '../../models';

@Component({
    selector: 'pko-pin-form',
    templateUrl: './pin-form.component.pug',
    styleUrls: [ './pin-form.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PinFormComponent implements OnInit {
    @Output() submitted: EventEmitter<SignupPin> = new EventEmitter<SignupPin>();

    form: FormGroup;

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
                    pinValidator('pin')
                ])
            ]
        });
    }

    submit(): void {
        if (this.form.valid) {
            this.submitted.emit(this.form.value);
        }
    }
}
