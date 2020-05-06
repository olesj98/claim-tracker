import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';

import { DialogContainerComponent } from './dialog-container.component';

import { DialogService } from './dialog.service';

@NgModule({
    declarations: [
        DialogContainerComponent
    ],
    imports: [
        CommonModule,
        OverlayModule,
        PortalModule
    ],
    providers: [
        DialogService
    ]
})
export class DialogModule { }
