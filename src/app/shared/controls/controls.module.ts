import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import { SelectModule } from '@pko/shared/select';

import { PinComponent } from './components/pin/pin.component';
import { PinCellComponent } from './components/pin-cell/pin-cell.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';

@NgModule({
    declarations: [
        PinComponent,
        PinCellComponent,
        CheckboxComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        TextMaskModule
    ],
    exports: [
        PinComponent,
        CheckboxComponent,
        SelectModule
    ]
})
export class ControlsModule { }
