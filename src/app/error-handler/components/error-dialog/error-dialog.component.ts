import { Component, ChangeDetectionStrategy, Optional, Inject } from '@angular/core';

import { DialogRef } from '@pko/shared/dialog';
import { BottomSheetRef } from '@pko/shared/bottom-sheet';

@Component({
    selector: 'pko-error-dialog',
    templateUrl: './error-dialog.component.pug',
    styleUrls: ['./error-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorDialogComponent {
    constructor(
        @Optional() @Inject(DialogRef) private _dialogRef: DialogRef<ErrorDialogComponent>,
        @Optional() @Inject(BottomSheetRef) private _bottomSheetRef: BottomSheetRef<ErrorDialogComponent>) {
    }

    dismiss() {
        if (this._dialogRef) {
            this._dialogRef.close();
        } else if (this._bottomSheetRef) {
            this._bottomSheetRef.dismiss();
        }
    }
}
