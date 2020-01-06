import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter, HostBinding,
    HostListener,
    Input,
    Output
} from '@angular/core';

export class OptionSelectionChange {
    constructor(public source: SelectOptionComponent) { }
}

@Component({
    selector: 'pko-option',
    templateUrl: './select-option.component.pug',
    styleUrls: ['./select-option.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectOptionComponent {
    @Input() value: any;
    @Input() disabled: boolean;

    @Output() selected: EventEmitter<OptionSelectionChange> = new EventEmitter<OptionSelectionChange>();

    @HostBinding('class.selected') isOptionSelected = false;

    get label(): string {
        return (this._elementRef.nativeElement.textContent || '').trim();
    }

    constructor(private _elementRef: ElementRef,
                private _changeDetectorRef: ChangeDetectorRef) {
    }

    @HostListener('click', []) onclick() {
        this.select();
    }

    select() {
        if (!this.disabled) {
            this.isOptionSelected = true;
            this._changeDetectorRef.markForCheck();
            this._notifyChange();
        }
    }

    deselect() {
        if (this.isOptionSelected) {
            this.isOptionSelected = false;
            this._changeDetectorRef.markForCheck();
            this._notifyChange();
        }
    }

    private _notifyChange() {
        this.selected.next(new OptionSelectionChange(this));
    }
}
