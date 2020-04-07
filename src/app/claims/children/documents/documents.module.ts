import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileUploadModule } from '../../../shared/file-upload';
import { DocumentsRoutingModule } from './documents-routing.module';

import { DocumentsComponent } from './containers/documents/documents.component';

@NgModule({
    declarations: [
        DocumentsComponent
    ],
    imports: [
        CommonModule,
        FileUploadModule,
        DocumentsRoutingModule
    ]
})
export class DocumentsModule { }
