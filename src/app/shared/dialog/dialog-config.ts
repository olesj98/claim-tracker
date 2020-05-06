import { ViewContainerRef } from '@angular/core';

export class DialogConfig<D = any> {
    hasBackdrop ? = true;
    backdropClass?: string;
    viewContainerRef?: ViewContainerRef;
    panelClass?: string | string[] = '';
    closeOnNavigation ? = true;
    disableClose ? = false;
    width?: string;
    height?: string;
    minWidth?: number | string;
    minHeight?: number | string;
    maxWidth?: number | string = '80vw';
    maxHeight?: number | string;
    data?: D | null = null;
}
