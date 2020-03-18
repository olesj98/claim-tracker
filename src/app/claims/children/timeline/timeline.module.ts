import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';

import { BottomSheetModule } from '../../../shared/bottom-sheet';
import { FileUploadModule } from '../../../shared/file-upload';
import { TimelineRoutingModule } from './timeline-routing.module';

import { TimelineComponent } from './containers/timeline/timeline.component';
import { TimelineTabComponent } from './components/timeline-tab/timeline-tab.component';
import { TimelineTabsComponent } from './components/timeline-tabs/timeline-tabs.component';

@NgModule({
    declarations: [
        TimelineComponent,
        TimelineTabComponent,
        TimelineTabsComponent
    ],
    imports: [
        CommonModule,
        PortalModule,
        FileUploadModule,
        BottomSheetModule,
        TimelineRoutingModule
    ]
})
export class TimelineModule { }
