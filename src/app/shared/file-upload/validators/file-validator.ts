import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from '@angular/forms';

export function fileValidator(extensions: Array<string>, maxSize: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        return isFileValid(control.value as File, extensions, maxSize);
    };
}

export function fileArraySizeValidator(maxSize: number): ValidatorFn {
    return (control: FormArray): ValidationErrors | null => {
        const filesOk = control.controls.every(file => file.valid);

        if (filesOk) {
            const size = control.controls.reduce((s, file) => s + file.value.size, 0);
            const sizeErrors = isSizeOk(size, maxSize);

            if (sizeErrors) {
                return { files: sizeErrors };
            }
        }
    };
}

export function isFileValid(file: File, extensions: Array<string>, maxSize: number): ValidationErrors | null {
    const extensionErrors = isExtensionOk(file.name, extensions);

    if (extensionErrors) {
        return { file: extensionErrors };
    }

    const sizeErrors = isSizeOk(file.size, maxSize);

    if (sizeErrors) {
        return { file: sizeErrors };
    }
}

export function isSizeOk(fileSize: number, maxSize: number): ValidationErrors | null {
    if (fileSize > maxSize) {
        return {
            size: {
                expected: bytesToSize(maxSize),
                provided: bytesToSize(fileSize)
            }
        };
    }
}

export function isExtensionOk(filename: string, extensions: Array<string>): ValidationErrors | null {
    const fileRegex = new RegExp(
        extensions
            .map(extension => `.${extension}`)
            .join('|'), 'i'
    );

    if (!fileRegex.test(filename)) {
        return {
            extension: {
                expected: extensions.join(', '),
                provided: filename.split('.').pop()
            }
        };
    }
}

export function bytesToSize(bytes: number, precision = 0): string {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];

    if (bytes === 0) {
        return '0';
    }
    const i = parseInt(`${Math.floor(Math.log(bytes) / Math.log(1024))}`, 10);

    if (i === 0) {
        return `${bytes}${sizes[i]}`;
    }
    return (bytes / Math.pow(1024, i)).toFixed(precision) + sizes[i];
}
