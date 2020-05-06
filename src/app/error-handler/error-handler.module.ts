import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TranslateModule } from '@ngx-translate/core';

import { DialogModule } from '@pko/shared/dialog';
import { BottomSheetModule } from '@pko/shared/bottom-sheet';

import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';

import { ERROR_HANDLER_INTEPCEPTORS } from './intepceptors';

@NgModule({
    declarations: [
        ErrorDialogComponent
    ],
    imports: [
        CommonModule,
        AngularSvgIconModule,
        TranslateModule,
        DialogModule,
        BottomSheetModule
    ],
    providers: [
        ...ERROR_HANDLER_INTEPCEPTORS
    ]
})
export class ErrorHandlerModule { }
