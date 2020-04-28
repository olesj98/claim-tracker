import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ibanValidator } from '@pko/shared/controls';
import { IbanMaskConfig } from '@pko/shared/util';
import { SendAccountNumberBody } from '@pko/claims/models';

@Component({
    selector: 'pko-timeline-iban-form',
    templateUrl: './timeline-iban-form.component.pug',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineIbanFormComponent {
    @Output() submitted: EventEmitter<SendAccountNumberBody> = new EventEmitter<SendAccountNumberBody>();

    mask = new IbanMaskConfig();

    form = new FormGroup({
        accountNumber: new FormControl(null, Validators.compose([
            Validators.required, ibanValidator()
        ]))
    });

    get acoountNumber(): FormControl {
        return this.form.get('accountNumber') as FormControl;
    }

    submit() {
        this.form.markAllAsTouched();

        if (this.form.valid) {
            this.submitted.emit({
                ...this.form.value,
                accountNumber: this.acoountNumber.value.replace(/\s/g, '')
            });
        }
    }
}
