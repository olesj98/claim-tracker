import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import { BottomSheetContainerComponent } from './bottom-sheet-container.component';

@NgModule({
    declarations: [
        BottomSheetContainerComponent
    ],
    entryComponents: [
        BottomSheetContainerComponent
    ],
    imports: [
        CommonModule,
        OverlayModule,
        PortalModule
    ],
    exports: [

    ]
})
export class BottomSheetModule { }
