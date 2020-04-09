import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { FileUploadModule } from '@pko/shared/file-upload';
import { DocumentsRoutingModule } from './documents-routing.module';

import { DocumentsComponent } from './containers/documents/documents.component';

@NgModule({
    declarations: [
        DocumentsComponent
    ],
    imports: [
        CommonModule,
        TranslateModule,
        FileUploadModule,
        DocumentsRoutingModule
    ]
})
export class DocumentsModule { }
