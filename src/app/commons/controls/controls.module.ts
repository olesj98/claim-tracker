import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import { SelectModule } from '@pko/commons/select';

import { TextareaComponent } from './components/textarea/textarea.component';
import { PinComponent } from './components/pin/pin.component';
import { PinCellComponent } from './components/pin-cell/pin-cell.component';

@NgModule({
    declarations: [
        TextareaComponent,
        PinComponent,
        PinCellComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        TextMaskModule
    ],
    exports: [
        TextareaComponent,
        PinComponent,
        SelectModule
    ]
})
export class ControlsModule { }
