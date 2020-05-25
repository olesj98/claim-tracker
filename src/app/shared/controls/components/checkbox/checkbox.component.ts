import {
    Component,
    ChangeDetectionStrategy,
    forwardRef,
    Input,
    Output,
    EventEmitter,
    ChangeDetectorRef, ElementRef, OnDestroy
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FocusMonitor } from '@angular/cdk/a11y';

@Component({
    selector: 'pko-checkbox',
    templateUrl: './checkbox.component.pug',
    styleUrls: ['./checkbox.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CheckboxComponent), multi: true }
    ]
})
export class CheckboxComponent implements ControlValueAccessor, OnDestroy {
    @Input()
    get required(): boolean { return this._required; }
    set required(value: boolean) { this._required = coerceBooleanProperty(value); }
    private _required: boolean;

    @Input()
    get checked(): boolean { return this._checked; }
    set checked(value: boolean) {
        if (value !== this.checked) {
            this._checked = value;
            this._changeDetectorRef.markForCheck();
        }
    }
    private _checked = false;

    @Input()
    get disabled() { return this._disabled; }
    set disabled(value: any) {
        const newValue = coerceBooleanProperty(value);

        if (newValue !== this.disabled) {
            this._disabled = newValue;
            this._changeDetectorRef.markForCheck();
        }
    }
    private _disabled = false;

    @Input() name: string | null = null;
    @Input() value: string;

    @Output() check: EventEmitter<boolean> = new EventEmitter<boolean>();

    onTouched: () => any = () => {};
    onChange: (value: boolean) => void = () => {};

    constructor(
        private _elementRef: ElementRef,
        private _changeDetectorRef: ChangeDetectorRef,
        private _focusMonitor: FocusMonitor) {

        this._focusMonitor.monitor(_elementRef, true)
            .subscribe(origin => {
                if (!origin) {
                    Promise.resolve().then(() => {
                        this.onTouched();
                        this._changeDetectorRef.markForCheck();
                    });
                }
            });
    }

    writeValue(value: any): void {
        this.checked = !!value;
    }

    registerOnChange(fn: (value: any) => void) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    onInteractionEvent(event: Event): void {
        event.stopPropagation();
    }

    onInputClick(event: Event) {
        event.stopPropagation();

        if (!this.disabled) {
            this.toggle();
            this.onChange(this.checked);
            this.check.emit(this.checked);
        }
    }

    toggle(): void {
        this.checked = !this.checked;
    }

    ngOnDestroy(): void {
        this._focusMonitor.stopMonitoring(this._elementRef);
    }
}
