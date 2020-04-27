import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { SelectComponent } from './select.component';
import { SelectOptionComponent } from './select-option.component';

@NgModule({
    declarations: [
        SelectComponent,
        SelectOptionComponent
    ],
    imports: [
        CommonModule,
        OverlayModule,
        AngularSvgIconModule
    ],
    exports: [
        SelectComponent,
        SelectOptionComponent
    ]
})
export class SelectModule { }
