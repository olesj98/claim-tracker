import { AbstractControl, ValidationErrors } from '@angular/forms';

export function PinValidator(compareWith: string) {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.value) {
            return control.value === control.root.get(compareWith).value ?
                null : {
                    pinCompare: false
                };
        }
    };
}
