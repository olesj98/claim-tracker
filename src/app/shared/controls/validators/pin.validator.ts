import { AbstractControl, ValidationErrors } from '@angular/forms';

export function pinValidator(compareWith: string) {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.value) {
            const root = control.root.get(compareWith);

            if (root.valid && control.value?.length ===  root.value.length) {
                return control.value === root.value ?
                    null : {
                        pinCompare: true
                    };
            }
        }
    };
}
