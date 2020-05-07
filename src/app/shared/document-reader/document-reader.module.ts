import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentReaderDirective } from './document-reader.directive';

@NgModule({
    declarations: [
        DocumentReaderDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        DocumentReaderDirective
    ]
})
export class DocumentReaderModule { }
