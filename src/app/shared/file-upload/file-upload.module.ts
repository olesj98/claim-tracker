import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { ControlsModule } from '../controls';

import { FileUploadZoneComponent } from './components/file-upload-zone/file-upload-zone.component';
import { DocumentComponent } from './components/document/document.component';
import { DragDropDirective } from './directives/drag-drop.directive';

@NgModule({
    declarations: [
        FileUploadZoneComponent,
        DragDropDirective,
        DocumentComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TranslateModule,
        ControlsModule
    ],
    exports: [
        FileUploadZoneComponent,
        DocumentComponent
    ]
})
export class FileUploadModule { }
