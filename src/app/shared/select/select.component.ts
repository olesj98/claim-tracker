import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    forwardRef, HostBinding, Injector,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    QueryList,
    ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { ConnectedPosition, ViewportRuler } from '@angular/cdk/overlay';
import { SelectionModel } from '@angular/cdk/collections';

import { defer, merge, Observable, Subject } from 'rxjs';
import { startWith, switchMap, take, takeUntil } from 'rxjs/operators';

import { OptionSelectionChange, SelectOptionComponent } from './select-option.component';

@Component({
    selector: 'pko-select',
    templateUrl: './select.component.pug',
    styleUrls: ['./select.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SelectComponent), multi: true }
    ]
})
export class SelectComponent implements OnInit, OnDestroy, AfterContentInit, ControlValueAccessor {
    @Input() @HostBinding('attr.disabled') disabled: boolean;
    @Input() placeholder: string;

    @ViewChild('trigger') trigger: ElementRef;
    @ContentChildren(SelectOptionComponent, { descendants: true }) options: QueryList<SelectOptionComponent>;

    panelOpen = false;
    triggerBoundingClientRect: ClientRect;
    positions: Array<ConnectedPosition> = [
        {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top'
        }
    ];

    private _selectionModel: SelectionModel<SelectOptionComponent> = new SelectionModel<SelectOptionComponent>(false);

    private _destroyed$: Subject<void> = new Subject<void>();
    private _optionValueChange: Observable<OptionSelectionChange> = defer(() => {
        const options = this.options;

        if (options) {
            return options.changes.pipe(
                startWith(options),
                switchMap(() => merge(...options.map(option => option.selected)))
            );
        }

        return this._ngZone.onStable.asObservable().pipe(
            take(1),
            switchMap(() => this._optionValueChange)
        );
    }) as Observable<OptionSelectionChange>;

    onChange = (value: any) => {};
    onTouched = () => {};

    get empty(): boolean {
        return !this._selectionModel || this._selectionModel.isEmpty();
    }

    get selectedOption(): SelectOptionComponent {
        return this._selectionModel.selected[0];
    }

    get selectedOptionLabel(): string {
        return this.empty ?
            null : this.selectedOption.label;
    }

    constructor(private _changeDetectorRef: ChangeDetectorRef,
                private _ngZone: NgZone,
                private _viewportRuler: ViewportRuler,
                private _injector: Injector) {
    }

    ngOnInit(): void {
        this._viewportRuler.change()
            .pipe(takeUntil(this._destroyed$))
            .subscribe(() => this._checkTriggerBoundingClientRect());
    }

    ngAfterContentInit(): void {
        this._selectionModel.changed
            .pipe(takeUntil(this._destroyed$))
            .subscribe(event => {
                event.added.forEach(option => option.select());
                event.removed.forEach(option => option.deselect());
            });

        this.options.changes
            .pipe(startWith(null), takeUntil(this._destroyed$))
            .subscribe(() => {
                this._resetOptions();
                this._initializeSelection();
            });
    }

    close() {
        if (this.panelOpen) {
            this.panelOpen = false;
            this._changeDetectorRef.markForCheck();
        }
    }

    open() {
        if (!this.panelOpen) {
            this.panelOpen = true;
            this.triggerBoundingClientRect = this.trigger.nativeElement.getBoundingClientRect();

            this._changeDetectorRef.markForCheck();
        }
    }

    toggle() {
        this.panelOpen ?
            this.close() : this.open();
    }

    writeValue(value: any) {
        if (this.options) {
            this._selectByValue(value);
        }
    }

    setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled;
        this._changeDetectorRef.markForCheck();
    }

    registerOnChange(fn: (value: any) => void) {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void) {
        this.onTouched = fn;
    }

    private _initializeSelection(): void {
        Promise.resolve().then(() => {
            const control = this._injector.get(NgControl);

            if (control) {
                this._selectByValue(control.value);
            }
        });
    }


    private _checkTriggerBoundingClientRect() {
        if (this.panelOpen) {
            this.triggerBoundingClientRect = this.trigger.nativeElement.getBoundingClientRect();
            this._changeDetectorRef.markForCheck();
        }
    }

    private _resetOptions() {
        const changedOrDestroyed$ = merge(this.options.changes, this._destroyed$);

        this._optionValueChange
            .pipe(takeUntil(changedOrDestroyed$))
            .subscribe(event => {
                this._onSelect(event.source);

                if (this.panelOpen) {
                    this.close();
                }
            });
    }

    private _onSelect(option: SelectOptionComponent) {
        const wasSelected = this._selectionModel.isSelected(option);

        if (option.value === null) {
            option.deselect();
            this._selectionModel.clear();
            this._propagateChanges(option.value);
        } else {
            if (wasSelected !== option.isOptionSelected) {
                option.isOptionSelected ? this._selectionModel.select(option) :
                    this._selectionModel.deselect(option);
            }
        }

        if (wasSelected !== this._selectionModel.isSelected(option)) {
            this._propagateChanges();
        }
    }

    private _propagateChanges(fallabackValue?: any) {
        this.onChange(this.selectedOption ? this.selectedOption.value : fallabackValue);
        this._changeDetectorRef.markForCheck();
    }

    private _selectByValue(value: any) {
        this._selectionModel.clear();
        this._selectValue(value);
        this._changeDetectorRef.markForCheck();
    }

    private _selectValue(value: any): SelectOptionComponent | undefined {
        const correspondingOption = this.options.find((option: SelectOptionComponent) =>
            option.value !== null && option.value === value);

        if (correspondingOption) {
            this._selectionModel.select(correspondingOption);
        }

        return correspondingOption;
    }

    ngOnDestroy(): void {
        this._destroyed$.next();
        this._destroyed$.complete();
    }
}
