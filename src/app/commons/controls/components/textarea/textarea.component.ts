import { Component, ChangeDetectionStrategy, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'pko-textarea',
    templateUrl: './textarea.component.pug',
    styleUrls: ['./textarea.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TextareaComponent), multi: true }
    ]
})
export class TextareaComponent implements ControlValueAccessor {
    @Input() disabled: boolean;
    @Input() max = 255;
    @Input() rows: number;
    @Input() placeholder: string;

    value: string;

    onChange = (value: string) => {};
    onTouched = () => {};

    get charsLeft(): number {
        const diff = this.max - (this.value || '').length;
        return diff < 0 ? 0 : diff;
    }

    changed(value: string) {
        if (!this.disabled) {
            this.writeValue(value);
        }
    }

    writeValue(value: string): void {
        this.value = value;
        this.onChange(this.value);
    }

    registerOnChange(fn: (value: string) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

}
