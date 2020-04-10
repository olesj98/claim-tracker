import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TextMaskModule } from 'angular2-text-mask';

import { BottomSheetModule } from '@pko/shared/bottom-sheet';
import { FileUploadModule } from '@pko/shared/file-upload';

import { TimelineRoutingModule } from './timeline-routing.module';

import { TimelineComponent } from './containers/timeline/timeline.component';
import { TimelineTabsComponent } from './components/timeline-tabs/timeline-tabs.component';
import { TimelineTabBodyComponent } from './components/timeline-tab-body/timeline-tab-body.component';
import { TimelineContentComponent } from './components/timeline-content/timeline-content.component';
import { TimelineContentTitleComponent } from './components/timeline-content-title/timeline-content-title.component';
import { TimelineIbanFormComponent } from './components/timeline-iban-form/timeline-iban-form.component';

@NgModule({
    declarations: [
        TimelineComponent,
        TimelineTabsComponent,
        TimelineTabBodyComponent,
        TimelineContentComponent,
        TimelineContentTitleComponent,
        TimelineIbanFormComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TextMaskModule,
        TranslateModule,
        FileUploadModule,
        BottomSheetModule,
        TimelineRoutingModule
    ]
})
export class TimelineModule { }
