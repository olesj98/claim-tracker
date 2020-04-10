import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'pko-document-upload-success',
    templateUrl: './document-upload-success.component.pug',
    styleUrls: ['./document-upload-success.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentUploadSuccessComponent {
    @Input() caption: string;
}
