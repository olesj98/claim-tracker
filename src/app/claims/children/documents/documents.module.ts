import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileUploadModule } from '@pko/commons/file-upload';
import { DocumentsRoutingModule } from './documents-routing.module';

import { DocumentsComponent } from './containers/documents/documents.component';
import { DocumentUploadRowComponent } from './components/document-upload-row/document-upload-row.component';

@NgModule({
    declarations: [
        DocumentsComponent,
        DocumentUploadRowComponent
    ],
    imports: [
        CommonModule,
        FileUploadModule,
        DocumentsRoutingModule
    ]
})
export class DocumentsModule { }
