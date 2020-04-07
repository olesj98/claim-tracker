import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileUploadZoneComponent } from './components/file-upload-zone/file-upload-zone.component';
import { FileComponent } from './components/file/file.component';
import { DocumentComponent } from './components/document/document.component';
import { DragDropDirective } from './directives/drag-drop.directive';

@NgModule({
    declarations: [
        FileUploadZoneComponent,
        DragDropDirective,
        FileComponent,
        DocumentComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        FileUploadZoneComponent,
        FileComponent,
        DocumentComponent
    ]
})
export class FileUploadModule { }
