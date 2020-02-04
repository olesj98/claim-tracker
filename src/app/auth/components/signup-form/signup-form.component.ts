import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Signup } from '../../models';

@Component({
    selector: 'pko-signup-form',
    templateUrl: './signup-form.component.pug',
    styleUrls: ['./signup-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupFormComponent implements OnInit {
    @Output() submitted: EventEmitter<Signup> = new EventEmitter<Signup>();

    form: FormGroup;

    constructor(private _fb: FormBuilder) { }

    ngOnInit() {
        this.form = this._fb.group({
            pesel: [ null, Validators.required ],
            phone: [ null, Validators.required ]
        });
    }

    submit() {
        if (this.form.valid) {
            this.submitted.next(this.form.value);
        }
    }
}
