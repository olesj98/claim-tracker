import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SelectModule } from '@pko/commons/select';

import { TextareaComponent } from './components/textarea/textarea.component';

@NgModule({
    declarations: [
        TextareaComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        TextareaComponent,
        SelectModule
    ]
})
export class ControlsModule { }
