import { AbstractControl, ValidationErrors } from '@angular/forms';

import * as iban from 'iban';

export function ibanValidator(country = 'PL') {
    return (control: AbstractControl): ValidationErrors | null => {
        const isIbanOk = iban.isValid(`${country}${control.value || ''}`);

        return isIbanOk ? null : {
            iban: true
        };
    };
}
