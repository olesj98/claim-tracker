import { AbstractControl, ValidationErrors } from '@angular/forms';

const PESEL_WEIGHT = [9, 7, 3, 1, 9, 7, 3, 1, 9, 7];
const ZERO_PESEL = '00000000000';

export function peselValidator(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value;

    if (value?.length) {
        const peselVal = { pesel: 'VALIDATION.PESEL' };

        if (value.length !== 11 || value === ZERO_PESEL) {
           return peselVal;
        }

        const isDigitOk = isPeselControlNumberCorrect(value);

        if (!isDigitOk) {
            return peselVal;
        }
    }
}

export function isPeselControlNumberCorrect(value: string): boolean {
    const controlDigit = +value.substring(10, 11);
    const control = PESEL_WEIGHT
        .reduce((s, digit, i) => s + +value.substring(i, i + 1) * digit, 0);

    return (control % 10) === controlDigit;
}
