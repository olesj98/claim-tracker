import {
    Component,
    ChangeDetectionStrategy,
    forwardRef,
    Input,
    OnInit,
    OnDestroy,
    ViewChildren,
    QueryList,
    AfterViewInit
} from '@angular/core';
import { ControlValueAccessor, FormArray, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { merge, Observable, Subject } from 'rxjs';
import { filter, map, mapTo, takeUntil } from 'rxjs/operators';

import { PinCellComponent } from '../pin-cell/pin-cell.component';

@Component({
    selector: 'pko-pin',
    templateUrl: './pin.component.pug',
    styleUrls: [ './pin.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => PinComponent), multi: true }
    ]
})
export class PinComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
    @Input() config = '****';
    @Input()
    set size(size: 's' | 'm' | string) {
        this._size = `size-${(size || 's')}`;
    }
    get size(): string {
        return this._size;
    }

    @Input() initialFocus: boolean;

    @ViewChildren(PinCellComponent) cells: QueryList<PinCellComponent>;

    form: FormGroup;
    destroyed$: Subject<void> = new Subject<void>();

    private _size: string;

    onChange = (value: string) => {};
    onTouched = () => {};

    get pin(): FormArray {
        return this.form.get('pin') as FormArray;
    }

    constructor(private _fb: FormBuilder) { }

    ngOnInit(): void {
        this.form = this._fb.group({
            pin: this._fb.array([...this.config]
                .map(() => new FormControl('')))
        });

        this.pin.valueChanges.pipe(
            map(convertToString),
            takeUntil(this.destroyed$)
        )
            .subscribe(this.onInternalChange.bind(this));
    }

    ngAfterViewInit(): void {
        if (this.initialFocus) {
            this.cells.first.focus();
        }

        this._getCellToFocus()
            .pipe(takeUntil(this.destroyed$))
            .subscribe(cell => cell?.focus());
    }

    onInternalChange(value: string) {
        this.writeValue(value);
    }

    writeValue(value: string): void {
        this.pin.patchValue(`${value || ''}`.split(''), { emitEvent: false });
        this.onChange(value);
    }

    registerOnChange(fn: (value: string) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    private _getCellToFocus(): Observable<PinCellComponent> {
        return merge(...this.cells.map((cell, index) =>
            cell.control.valueChanges.pipe(
                filter(char => char !== ''),
                mapTo(this.cells.toArray()[index + 1])
            )
        ));
    }
}

function convertToString(pinAsArray: Array<string | null>): string {
    return pinAsArray
        .filter(char => !!char)
        .join('');
}
