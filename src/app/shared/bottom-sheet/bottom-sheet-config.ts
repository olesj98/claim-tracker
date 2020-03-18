import { InjectionToken, ViewContainerRef } from '@angular/core';

export const BOTTOM_SHEET_DATA = new InjectionToken<any>('bottom_sheet.data');

export class BottomSheetConfig<D = any> {
    viewContainerRef?: ViewContainerRef;
    data?: D;
    hasBackdrop ? = true;
    backdropClass?: string;
    disableClose?: boolean;
}
