import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'pko-document-upload-row',
    templateUrl: './document-upload-row.component.pug',
    styleUrls: ['./document-upload-row.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentUploadRowComponent {
    @Input() files: Array<string>;
    @Input() fileFor: string;
    @Input() multiple: boolean;

    collapsed = true;

    get completed(): boolean {
        return this.files && this.files.length > 0;
    }
}
