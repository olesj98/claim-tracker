import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { ControlsModule } from '../controls';

import { FileUploadZoneComponent } from './components/file-upload-zone/file-upload-zone.component';
import { DocumentComponent } from './components/document/document.component';
import { DocumentUploadSuccessComponent } from './components/document-upload-success/document-upload-success.component';
import { DragDropDirective } from './directives/drag-drop.directive';

import { DOCUMENT_UPLOAD_PIPES } from './pipes';

@NgModule({
    declarations: [
        FileUploadZoneComponent,
        DragDropDirective,
        DocumentComponent,
        DocumentUploadSuccessComponent,
        ...DOCUMENT_UPLOAD_PIPES
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AngularSvgIconModule,
        TranslateModule,
        ControlsModule
    ],
    exports: [
        FileUploadZoneComponent,
        DocumentComponent,
        DocumentUploadSuccessComponent,
        ...DOCUMENT_UPLOAD_PIPES
    ]
})
export class FileUploadModule { }
