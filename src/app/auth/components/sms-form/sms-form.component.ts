import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'pko-sms-form',
    templateUrl: './sms-form.component.pug',
    styleUrls: [ './sms-form.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SMSFormComponent {
    @Output() submitted: EventEmitter<string> = new EventEmitter<string>();

    sms = new FormControl('', Validators.compose([
        Validators.required
    ]));

    submit() {
        if (this.sms.valid) {
            this.submitted.emit(this.sms.value);
        }
    }
}
